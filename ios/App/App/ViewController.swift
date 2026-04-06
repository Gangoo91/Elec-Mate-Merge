import UIKit
import Capacitor

class ViewController: CAPBridgeViewController {
    override func viewDidLoad() {
        super.viewDidLoad()
        // Enable iOS edge-swipe-back gesture — navigates through React Router history
        webView?.allowsBackForwardNavigationGestures = true
    }
}
