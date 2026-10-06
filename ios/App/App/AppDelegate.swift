import UIKit
import Capacitor
import UserNotifications

@UIApplicationMain
class AppDelegate: UIResponder, UIApplicationDelegate, UNUserNotificationCenterDelegate {

    var window: UIWindow?

    func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
        // Set ourselves as the notification centre delegate so we control
        // how notifications are presented when the app is in the foreground.
        UNUserNotificationCenter.current().delegate = self
        registerNotificationActions()
        return true
    }

    // MARK: - Notification action buttons (ELE-2022)

    /// Enquiry pushes with an AI-suggested visit carry `aps.category = ENQUIRY_VISIT`.
    /// Long-press / pull down shows "Book this time" and "No visit".
    private func registerNotificationActions() {
        let book = UNNotificationAction(identifier: "VISIT_BOOK", title: "Book this time", options: [])
        let decline = UNNotificationAction(identifier: "VISIT_DECLINE", title: "No visit", options: [.destructive])
        let visit = UNNotificationCategory(identifier: "ENQUIRY_VISIT",
                                           actions: [book, decline],
                                           intentIdentifiers: [],
                                           options: [])
        UNUserNotificationCenter.current().setNotificationCategories([visit])
    }

    /// Book or decline straight from the notification, without opening the app.
    /// Auth is the push's single-use code; the server re-checks the slot is free.
    private func performVisitAction(enquiryId: String, token: String, book: Bool, done: @escaping () -> Void) {
        guard let url = URL(string: "https://jtwygbeceundfgnkirof.supabase.co/functions/v1/enquiry-visit-action") else {
            done(); return
        }
        var request = URLRequest(url: url, timeoutInterval: 25)
        request.httpMethod = "POST"
        request.setValue("application/json", forHTTPHeaderField: "Content-Type")
        let body: [String: Any] = [
            "enquiry_id": enquiryId,
            "action": book ? "book" : "decline",
            "slot_index": 0,
            "token": token,
        ]
        request.httpBody = try? JSONSerialization.data(withJSONObject: body)

        URLSession.shared.dataTask(with: request) { data, response, _ in
            let status = (response as? HTTPURLResponse)?.statusCode ?? 0
            let json = (data.flatMap { try? JSONSerialization.jsonObject(with: $0) }) as? [String: Any] ?? [:]
            let label = json["label"] as? String ?? ""

            let content = UNMutableNotificationContent()
            if !book {
                content.title = "No visit needed"
                content.body = "Noted. Tap to reply to them."
            } else if (200..<300).contains(status) {
                content.title = label.isEmpty ? "Visit booked" : "Booked \(label)"
                content.body = "It's in your diary. Tap to send them the time."
            } else if status == 409 {
                content.title = "That time has just gone"
                content.body = "Tap to pick from fresh times."
            } else {
                content.title = "Could not book"
                content.body = (json["error"] as? String) ?? "Tap to open the enquiry."
            }
            content.sound = .default
            content.userInfo = ["deep_link": "/electrician/enquiries?open=\(enquiryId)", "type": "default"]
            let note = UNNotificationRequest(identifier: "enquiry-\(enquiryId)-result", content: content, trigger: nil)
            UNUserNotificationCenter.current().add(note) { _ in done() }
        }.resume()
    }

    // MARK: - Push Notification Forwarding

    func application(_ application: UIApplication, didRegisterForRemoteNotificationsWithDeviceToken deviceToken: Data) {
        NotificationCenter.default.post(name: .capacitorDidRegisterForRemoteNotifications, object: deviceToken)
    }

    func application(_ application: UIApplication, didFailToRegisterForRemoteNotificationsWithError error: Error) {
        NotificationCenter.default.post(name: .capacitorDidFailToRegisterForRemoteNotifications, object: error)
    }

    // MARK: - Foreground Notification Presentation

    func userNotificationCenter(_ center: UNUserNotificationCenter,
                                willPresent notification: UNNotification,
                                withCompletionHandler completionHandler: @escaping (UNNotificationPresentationOptions) -> Void) {
        // Always show banner, badge, and sound even when the app is in the foreground
        if #available(iOS 14.0, *) {
            completionHandler([.banner, .badge, .sound, .list])
        } else {
            completionHandler([.alert, .badge, .sound])
        }
    }

    func userNotificationCenter(_ center: UNUserNotificationCenter,
                                didReceive response: UNNotificationResponse,
                                withCompletionHandler completionHandler: @escaping () -> Void) {
        let info = response.notification.request.content.userInfo

        // Book / No visit pressed on an enquiry notification: handle it natively
        if response.actionIdentifier == "VISIT_BOOK" || response.actionIdentifier == "VISIT_DECLINE",
           let enquiryId = info["enquiry_id"] as? String,
           let token = info["action_token"] as? String {
            performVisitAction(enquiryId: enquiryId,
                               token: token,
                               book: response.actionIdentifier == "VISIT_BOOK") {
                completionHandler()
            }
            return
        }

        // Let Capacitor handle the notification tap
        NotificationCenter.default.post(name: Notification.Name("capacitorDidReceiveRemoteNotification"),
                                        object: info)
        completionHandler()
    }

    func applicationWillResignActive(_ application: UIApplication) {
        // Sent when the application is about to move from active to inactive state. This can occur for certain types of temporary interruptions (such as an incoming phone call or SMS message) or when the user quits the application and it begins the transition to the background state.
        // Use this method to pause ongoing tasks, disable timers, and invalidate graphics rendering callbacks. Games should use this method to pause the game.
    }

    func applicationDidEnterBackground(_ application: UIApplication) {
        // Use this method to release shared resources, save user data, invalidate timers, and store enough application state information to restore your application to its current state in case it is terminated later.
        // If your application supports background execution, this method is called instead of applicationWillTerminate: when the user quits.
    }

    func applicationWillEnterForeground(_ application: UIApplication) {
        // Called as part of the transition from the background to the active state; here you can undo many of the changes made on entering the background.
    }

    func applicationDidBecomeActive(_ application: UIApplication) {
        // Restart any tasks that were paused (or not yet started) while the application was inactive. If the application was previously in the background, optionally refresh the user interface.
    }

    func applicationWillTerminate(_ application: UIApplication) {
        // Called when the application is about to terminate. Save data if appropriate. See also applicationDidEnterBackground:.
    }

    func application(_ app: UIApplication, open url: URL, options: [UIApplication.OpenURLOptionsKey: Any] = [:]) -> Bool {
        // Called when the app was launched with a url. Feel free to add additional processing here,
        // but if you want the App API to support tracking app url opens, make sure to keep this call
        return ApplicationDelegateProxy.shared.application(app, open: url, options: options)
    }

    func application(_ application: UIApplication, continue userActivity: NSUserActivity, restorationHandler: @escaping ([UIUserActivityRestoring]?) -> Void) -> Bool {
        // Called when the app was launched with an activity, including Universal Links.
        // Feel free to add additional processing here, but if you want the App API to support
        // tracking app url opens, make sure to keep this call
        return ApplicationDelegateProxy.shared.application(application, continue: userActivity, restorationHandler: restorationHandler)
    }

}
