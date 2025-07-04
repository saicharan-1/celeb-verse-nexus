
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Star, MapPin, Users, Instagram, Youtube, Twitter, Download, ArrowLeft, Heart, Share2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';

interface Celebrity {
  id: string;
  name: string;
  genre: string;
  country: string;
  image_url?: string;
  followers_count: number;
  verified: boolean;
  bio: string;
  social_media: {
    instagram?: string;
    youtube?: string;
    twitter?: string;
  };
  stats: {
    posts: number;
    fans: number;
    following: number;
  };
  setlist?: string[];
}

const CelebrityProfile = () => {
  const { id } = useParams();
  const [celebrity, setCelebrity] = useState<Celebrity | null>(null);
  const [loading, setLoading] = useState(true);
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    // Mock data fetch
    const mockCelebrity: Celebrity = {
      id: id || '1',
      name: 'Diljit Dosanjh',
      genre: 'Punjabi Singer & Actor',
      country: 'India',
      image_url: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400',
      followers_count: 15000000,
      verified: true,
      bio: 'International Punjabi singer, actor, and performer. Known for blending traditional Punjabi music with contemporary sounds. Has performed at major international venues including Coachella.',
      social_media: {
        instagram: '@diljitdosanjh',
        youtube: 'DiljitDosanjhOfficial',
        twitter: '@diljitdosanjh'
      },
      stats: {
        posts: 1234,
        fans: 15000000,
        following: 892
      },
      setlist: [
        'Proper Patola',
        'Do You Know',
        'Laembadgini',
        'Sauda Khara Khara',
        'Vibe',
        'GOAT'
      ]
    };

    setTimeout(() => {
      setCelebrity(mockCelebrity);
      setLoading(false);
    }, 1000);
  }, [id]);

  const handleFollow = () => {
    setIsFollowing(!isFollowing);
    toast.success(isFollowing ? 'Unfollowed successfully!' : 'Following now!');
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success('Profile link copied to clipboard!');
  };

  const handleDownloadPDF = () => {
    toast.info('Generating PDF profile...');
    // In real app, this would call the PDF generation API
    setTimeout(() => {
      toast.success('PDF downloaded successfully!');
    }, 2000);
  };

  const formatFollowers = (count: number) => {
    if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`;
    if (count >= 1000) return `${(count / 1000).toFixed(1)}K`;
    return count.toString();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <div className="animate-pulse">
              <div className="h-64 bg-gray-200 rounded-lg mb-8"></div>
              <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-32 bg-gray-200 rounded-lg"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!celebrity) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Celebrity Not Found</h1>
          <Link to="/">
            <Button>Back to Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-3">
              <ArrowLeft className="h-5 w-5" />
              <div className="flex items-center space-x-2">
                <Star className="h-8 w-8 text-purple-600" />
                <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  CelebNetwork
                </h1>
              </div>
            </Link>
            <div className="flex items-center space-x-4">
              <Button variant="outline" onClick={handleShare}>
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
              <Link to="/auth">
                <Button>Sign In</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          
          {/* Profile Header */}
          <Card className="mb-8">
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
                <div className="relative">
                  <Avatar className="w-32 h-32">
                    <AvatarImage src={celebrity.image_url} alt={celebrity.name} />
                    <AvatarFallback className="text-2xl">
                      {celebrity.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  {celebrity.verified && (
                    <div className="absolute -bottom-2 -right-2 bg-blue-500 rounded-full p-2">
                      <Star className="h-4 w-4 fill-white text-white" />
                    </div>
                  )}
                </div>

                <div className="flex-1 text-center md:text-left">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                    <div>
                      <h1 className="text-3xl font-bold mb-2">{celebrity.name}</h1>
                      <div className="flex items-center justify-center md:justify-start space-x-4 text-gray-600">
                        <Badge variant="secondary" className="bg-purple-100 text-purple-800">
                          {celebrity.genre}
                        </Badge>
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-1" />
                          {celebrity.country}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 mt-4 md:mt-0">
                      <Button
                        onClick={handleFollow}
                        className={`${
                          isFollowing 
                            ? 'bg-gray-600 hover:bg-gray-700' 
                            : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700'
                        }`}
                      >
                        <Heart className={`h-4 w-4 mr-2 ${isFollowing ? 'fill-current' : ''}`} />
                        {isFollowing ? 'Following' : 'Follow'}
                      </Button>
                      <Button variant="outline" onClick={handleDownloadPDF}>
                        <Download className="h-4 w-4 mr-2" />
                        PDF
                      </Button>
                    </div>
                  </div>

                  <p className="text-gray-600 mb-6">{celebrity.bio}</p>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="text-center">
                      <div className="font-bold text-xl">{celebrity.stats.posts}</div>
                      <div className="text-gray-600 text-sm">Posts</div>
                    </div>
                    <div className="text-center">
                      <div className="font-bold text-xl">{formatFollowers(celebrity.stats.fans)}</div>
                      <div className="text-gray-600 text-sm">Fans</div>
                    </div>
                    <div className="text-center">
                      <div className="font-bold text-xl">{celebrity.stats.following}</div>
                      <div className="text-gray-600 text-sm">Following</div>
                    </div>
                  </div>

                  {/* Social Media */}
                  <div className="flex items-center justify-center md:justify-start space-x-4">
                    {celebrity.social_media.instagram && (
                      <Button variant="outline" size="sm">
                        <Instagram className="h-4 w-4 mr-2" />
                        Instagram
                      </Button>
                    )}
                    {celebrity.social_media.youtube && (
                      <Button variant="outline" size="sm">
                        <Youtube className="h-4 w-4 mr-2" />
                        YouTube
                      </Button>
                    )}
                    {celebrity.social_media.twitter && (
                      <Button variant="outline" size="sm">
                        <Twitter className="h-4 w-4 mr-2" />
                        Twitter
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Content Sections */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Popular Songs/Content */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Star className="h-5 w-5 mr-2 text-yellow-500" />
                  Popular Content
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {celebrity.setlist?.map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="font-medium">{item}</span>
                      <Badge variant="outline">#{index + 1}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                    <div>
                      <p className="font-medium">New single released</p>
                      <p className="text-sm text-gray-600">2 days ago</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    <div>
                      <p className="font-medium">Live performance in Mumbai</p>
                      <p className="text-sm text-gray-600">1 week ago</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                    <div>
                      <p className="font-medium">Interview with BBC</p>
                      <p className="text-sm text-gray-600">2 weeks ago</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Fan Engagement */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Fan Engagement</CardTitle>
              <CardDescription>
                Connect with other fans and join the community
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Users className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Join the Fan Community</h3>
                <p className="text-gray-600 mb-6">
                  Sign up to follow {celebrity.name}, get exclusive updates, and connect with other fans.
                </p>
                <Link to="/auth">
                  <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                    Join Community
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CelebrityProfile;
