
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Heart, 
  Star, 
  Users, 
  Settings,
  LogOut,
  Bell,
  Search,
  UserMinus,
  Music,
  MapPin
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

interface FollowedCelebrity {
  id: string;
  name: string;
  genre: string;
  country: string;
  image_url?: string;
  followers_count: number;
  verified: boolean;
  followedAt: string;
  lastActive: string;
}

interface FanStats {
  totalFollowing: number;
  favoriteGenres: string[];
  joinedDate: string;
}

const FanDashboard = () => {
  const [followedCelebrities, setFollowedCelebrities] = useState<FollowedCelebrity[]>([]);
  const [fanStats, setFanStats] = useState<FanStats | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Mock current fan data
  const fan = {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100'
  };

  useEffect(() => {
    // Mock API call
    const mockFollowedCelebrities: FollowedCelebrity[] = [
      {
        id: '1',
        name: 'Diljit Dosanjh',
        genre: 'Punjabi Singer',
        country: 'India',
        image_url: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400',
        followers_count: 15000000,
        verified: true,
        followedAt: '2 weeks ago',
        lastActive: '2 hours ago'
      },
      {
        id: '2',
        name: 'Priyanka Chopra',
        genre: 'Actress',
        country: 'India',
        image_url: 'https://images.unsplash.com/photo-1494790108755-2616b612b002?w=400',
        followers_count: 89000000,
        verified: true,
        followedAt: '1 month ago',
        lastActive: '1 day ago'
      },
      {
        id: '3',
        name: 'A.R. Rahman',
        genre: 'Music Composer',
        country: 'India',
        image_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
        followers_count: 5000000,
        verified: true,
        followedAt: '3 weeks ago',
        lastActive: '5 hours ago'
      }
    ];

    const mockFanStats: FanStats = {
      totalFollowing: 3,
      favoriteGenres: ['Punjabi Music', 'Bollywood', 'Classical'],
      joinedDate: 'January 2024'
    };

    setTimeout(() => {
      setFollowedCelebrities(mockFollowedCelebrities);
      setFanStats(mockFanStats);
      setLoading(false);
    }, 1000);
  }, []);

  const handleUnfollow = (celebrityId: string, celebrityName: string) => {
    setFollowedCelebrities(prev => prev.filter(celeb => celeb.id !== celebrityId));
    toast.success(`Unfollowed ${celebrityName}`);
  };

  const handleLogout = () => {
    toast.success('Logged out successfully');
    navigate('/');
  };

  const formatFollowers = (count: number) => {
    if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`;
    if (count >= 1000) return `${(count / 1000).toFixed(1)}K`;
    return count.toString();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="container mx-auto px-4 py-12">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-32 bg-gray-200 rounded-lg"></div>
              ))}
            </div>
            <div className="h-96 bg-gray-200 rounded-lg"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link to="/" className="flex items-center space-x-2">
                <Star className="h-8 w-8 text-purple-600" />
                <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  CelebNetwork
                </h1>
              </Link>
              <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                Fan Dashboard
              </Badge>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/discover">
                <Button variant="outline">
                  <Search className="h-4 w-4 mr-2" />
                  Discover
                </Button>
              </Link>
              <Button variant="outline">
                <Bell className="h-4 w-4 mr-2" />
                Notifications
              </Button>
              <Button variant="outline">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
              <Button variant="outline" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="flex items-center space-x-4 mb-8">
          <Avatar className="w-16 h-16">
            <AvatarImage src={fan.avatar} alt={fan.name} />
            <AvatarFallback>{fan.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-3xl font-bold">Welcome back, {fan.name}!</h1>
            <p className="text-gray-600">Keep up with your favorite celebrities</p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Following</CardTitle>
              <Heart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{fanStats?.totalFollowing}</div>
              <p className="text-xs text-muted-foreground">
                Celebrities you follow
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Member Since</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{fanStats?.joinedDate}</div>
              <p className="text-xs text-muted-foreground">
                Your journey began
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Favorite Genres</CardTitle>
              <Music className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{fanStats?.favoriteGenres.length}</div>
              <p className="text-xs text-muted-foreground">
                Different genres you love
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="following" className="space-y-6">
          <TabsList>
            <TabsTrigger value="following">Following</TabsTrigger>
            <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
          </TabsList>

          <TabsContent value="following">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Heart className="h-5 w-5 mr-2 text-red-500" />
                  Celebrities You Follow
                </CardTitle>
                <CardDescription>
                  Your personalized celebrity feed
                </CardDescription>
              </CardHeader>
              <CardContent>
                {followedCelebrities.length === 0 ? (
                  <div className="text-center py-12">
                    <Heart className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">No Celebrities Followed Yet</h3>
                    <p className="text-gray-600 mb-6">
                      Start following your favorite celebrities to see them here.
                    </p>
                    <Link to="/discover">
                      <Button className="bg-gradient-to-r from-purple-600 to-pink-600">
                        Discover Celebrities
                      </Button>
                    </Link>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {followedCelebrities.map((celebrity) => (
                      <Card key={celebrity.id} className="hover:shadow-lg transition-shadow">
                        <CardHeader className="text-center pb-4">
                          <div className="relative mx-auto mb-4">
                            <Avatar className="w-20 h-20 mx-auto">
                              <AvatarImage src={celebrity.image_url} alt={celebrity.name} />
                              <AvatarFallback>{celebrity.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                            </Avatar>
                            {celebrity.verified && (
                              <div className="absolute -bottom-1 -right-1 bg-blue-500 rounded-full p-1">
                                <Star className="h-3 w-3 fill-white text-white" />
                              </div>
                            )}
                          </div>
                          <CardTitle className="text-lg">{celebrity.name}</CardTitle>
                          <CardDescription className="flex items-center justify-center space-x-2">
                            <Music className="h-4 w-4" />
                            <span>{celebrity.genre}</span>
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="text-center space-y-3">
                          <div className="flex items-center justify-center space-x-2 text-gray-600">
                            <MapPin className="h-4 w-4" />
                            <span>{celebrity.country}</span>
                          </div>
                          <div className="text-sm text-gray-600">
                            <p>Following since: {celebrity.followedAt}</p>
                            <p>Last active: {celebrity.lastActive}</p>
                          </div>
                          <div className="space-y-2">
                            <Link to={`/celebrity/${celebrity.id}`}>
                              <Button className="w-full" variant="outline">
                                View Profile
                              </Button>
                            </Link>
                            <Button 
                              className="w-full" 
                              variant="outline"
                              onClick={() => handleUnfollow(celebrity.id, celebrity.name)}
                            >
                              <UserMinus className="h-4 w-4 mr-2" />
                              Unfollow
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="recommendations">
            <Card>
              <CardHeader>
                <CardTitle>Recommended For You</CardTitle>
                <CardDescription>
                  Discover new celebrities based on your interests
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Search className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Personalized Recommendations</h3>
                  <p className="text-gray-600 mb-6">
                    We're working on AI-powered recommendations based on your preferences.
                  </p>
                  <Link to="/discover">
                    <Button className="bg-gradient-to-r from-purple-600 to-pink-600">
                      Explore All Celebrities
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="activity">
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>
                  Your recent interactions and updates
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3 p-4 bg-blue-50 rounded-lg">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    <div>
                      <p className="font-medium">Followed Diljit Dosanjh</p>
                      <p className="text-sm text-gray-600">2 weeks ago</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 p-4 bg-green-50 rounded-lg">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                    <div>
                      <p className="font-medium">Followed Priyanka Chopra</p>
                      <p className="text-sm text-gray-600">1 month ago</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 p-4 bg-purple-50 rounded-lg">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                    <div>
                      <p className="font-medium">Joined CelebNetwork</p>
                      <p className="text-sm text-gray-600">January 2024</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default FanDashboard;
