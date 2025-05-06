
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Award, Star, User, MessageSquare } from "lucide-react";

// Mock data for now
const topPosters = [
  {
    id: "1",
    name: "Sarah Williams",
    avatar: "https://i.pravatar.cc/150?img=2",
    posts: 32,
  },
  {
    id: "2",
    name: "Mike Johnson",
    avatar: "https://i.pravatar.cc/150?img=3",
    posts: 28,
  },
  {
    id: "3",
    name: "Emma Davis",
    avatar: "https://i.pravatar.cc/150?img=4",
    posts: 24,
  },
  {
    id: "4",
    name: "John Smith",
    avatar: "https://i.pravatar.cc/150?img=1",
    posts: 21,
  },
  {
    id: "5",
    name: "Robert Brown",
    avatar: "https://i.pravatar.cc/150?img=5",
    posts: 18,
  }
];

const topLiked = [
  {
    id: "1",
    name: "Emma Davis",
    avatar: "https://i.pravatar.cc/150?img=4",
    likes: 87,
  },
  {
    id: "2",
    name: "John Smith",
    avatar: "https://i.pravatar.cc/150?img=1",
    likes: 76,
  },
  {
    id: "3",
    name: "Sarah Williams",
    avatar: "https://i.pravatar.cc/150?img=2",
    likes: 65,
  },
  {
    id: "4",
    name: "Mike Johnson",
    avatar: "https://i.pravatar.cc/150?img=3",
    likes: 52,
  },
  {
    id: "5",
    name: "Lisa Jones",
    avatar: "https://i.pravatar.cc/150?img=6",
    likes: 45,
  }
];

const TopContributors = () => {
  return (
    <div className="space-y-6">
      {/* Competition reminder */}
      <div className="border border-elec-yellow/20 bg-elec-gray p-4 rounded-lg text-center">
        <Award className="h-8 w-8 mx-auto mb-2 text-elec-yellow" />
        <h3 className="font-medium mb-2">Monthly Prizes</h3>
        <p className="text-sm text-muted-foreground mb-2">
          Most liked comment and most active participant each win a £50 voucher!
        </p>
        <div className="grid grid-cols-2 gap-2 mt-3">
          <div className="bg-elec-yellow/10 p-2 rounded">
            <MessageSquare className="h-4 w-4 mx-auto mb-1" />
            <p className="text-xs">Most Active</p>
          </div>
          <div className="bg-elec-yellow/10 p-2 rounded">
            <Star className="h-4 w-4 mx-auto mb-1" />
            <p className="text-xs">Most Liked</p>
          </div>
        </div>
      </div>
      
      {/* Top active users */}
      <div className="border border-elec-yellow/20 bg-elec-gray p-4 rounded-lg">
        <div className="flex items-center gap-2 mb-3">
          <MessageSquare className="h-5 w-5 text-elec-yellow" />
          <h3 className="font-medium">Most Active Users</h3>
        </div>
        <div className="space-y-3">
          {topPosters.map((user, index) => (
            <div key={user.id} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback className="bg-elec-yellow text-elec-dark">
                      {user.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  {index < 3 && (
                    <span className="absolute -top-1 -right-1 bg-elec-yellow text-elec-dark h-4 w-4 rounded-full flex items-center justify-center text-[10px]">
                      {index + 1}
                    </span>
                  )}
                </div>
                <span className="text-sm font-medium">{user.name}</span>
              </div>
              <span className="text-xs bg-elec-gray-light/10 px-2 py-1 rounded-full">
                {user.posts} posts
              </span>
            </div>
          ))}
        </div>
      </div>
      
      {/* Most liked users */}
      <div className="border border-elec-yellow/20 bg-elec-gray p-4 rounded-lg">
        <div className="flex items-center gap-2 mb-3">
          <Star className="h-5 w-5 text-elec-yellow" />
          <h3 className="font-medium">Most Liked Contributors</h3>
        </div>
        <div className="space-y-3">
          {topLiked.map((user, index) => (
            <div key={user.id} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback className="bg-elec-yellow text-elec-dark">
                      {user.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  {index < 3 && (
                    <span className="absolute -top-1 -right-1 bg-elec-yellow text-elec-dark h-4 w-4 rounded-full flex items-center justify-center text-[10px]">
                      {index + 1}
                    </span>
                  )}
                </div>
                <span className="text-sm font-medium">{user.name}</span>
              </div>
              <span className="text-xs bg-elec-gray-light/10 px-2 py-1 rounded-full">
                {user.likes} likes
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopContributors;
