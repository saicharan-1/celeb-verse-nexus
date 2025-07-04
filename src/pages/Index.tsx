
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Users, Star, MapPin, Music } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Celebrity {
  id: string;
  name: string;
  genre: string;
  country: string;
  image_url?: string;
  followers_count: number;
  verified: boolean;
}

const Index = () => {
  const [celebrities, setCelebrities] = useState<Celebrity[]>([]);
  const [loading, setLoading] = useState(true);

  // Mock data for demonstration
  useEffect(() => {
    const mockCelebrities: Celebrity[] = [
      {
        id: '1',
        name: 'Diljit Dosanjh',
        genre: 'Punjabi Singer',
        country: 'India',
        image_url: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400',
        followers_count: 15000000,
        verified: true
      },
      {
        id: '2',
        name: 'Priyanka Chopra',
        genre: 'Actress',
        country: 'India',
        image_url: 'https://images.unsplash.com/photo-1494790108755-2616b612b002?w=400',
        followers_count: 89000000,
        verified: true
      },
      {
        id: '3',
        name: 'A.R. Rahman',
        genre: 'Music Composer',
        country: 'India',
        image_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
        followers_count: 5000000,
        verified: true
      }
    ];
    
    setTimeout(() => {
      setCelebrities(mockCelebrities);
      setLoading(false);
    }, 1000);
  }, []);

  const formatFollowers = (count: number) => {
    if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`;
    if (count >= 1000) return `${(count / 1000).toFixed(1)}K`;
    return count.toString();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Star className="h-8 w-8 text-purple-600" />
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                CelebNetwork
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/discover">
                <Button variant="outline">Discover Celebrities</Button>
              </Link>
              <Link to="/auth">
                <Button>Sign In</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 bg-clip-text text-transparent">
            Discover Amazing Celebrities
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Connect with your favorite stars, discover new talent, and get exclusive access to celebrity content and updates.
          </p>
          <div className="flex items-center justify-center space-x-4">
            <Link to="/discover">
              <Button size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                Start Discovering
              </Button>
            </Link>
            <Link to="/celebrity/signup">
              <Button size="lg" variant="outline">
                Join as Celebrity
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Celebrities */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-center mb-12">Featured Celebrities</h3>
          
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="animate-pulse">
                  <CardHeader className="pb-4">
                    <div className="w-20 h-20 bg-gray-200 rounded-full mx-auto mb-4" />
                    <div className="h-6 bg-gray-200 rounded w-3/4 mx-auto mb-2" />
                    <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto" />
                  </CardHeader>
                  <CardContent>
                    <div className="h-10 bg-gray-200 rounded mb-4" />
                    <div className="h-8 bg-gray-200 rounded" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {celebrities.map((celebrity) => (
                <Card key={celebrity.id} className="hover:shadow-lg transition-shadow cursor-pointer group">
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
                    <CardTitle className="group-hover:text-purple-600 transition-colors">
                      {celebrity.name}
                    </CardTitle>
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
                    <div className="flex items-center justify-center space-x-2">
                      <Users className="h-4 w-4 text-purple-600" />
                      <span className="font-semibold">{formatFollowers(celebrity.followers_count)} followers</span>
                    </div>
                    <Link to={`/celebrity/${celebrity.id}`}>
                      <Button className="w-full mt-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                        View Profile
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-purple-600 to-pink-600 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">10,000+</div>
              <div className="text-purple-100">Verified Celebrities</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">50M+</div>
              <div className="text-purple-100">Active Fans</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">180+</div>
              <div className="text-purple-100">Countries</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Star className="h-6 w-6 text-purple-400" />
                <span className="text-xl font-bold">CelebNetwork</span>
              </div>
              <p className="text-gray-400">
                The ultimate platform for celebrity discovery and fan engagement.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">For Fans</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/discover" className="hover:text-white">Discover</Link></li>
                <li><Link to="/auth" className="hover:text-white">Sign Up</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">For Celebrities</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/celebrity/signup" className="hover:text-white">Join Platform</Link></li>
                <li><Link to="/celebrity/dashboard" className="hover:text-white">Dashboard</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Help Center</a></li>
                <li><a href="#" className="hover:text-white">Contact Us</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 CelebNetwork. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
