
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Search, Star, Sparkles, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';

interface AISuggestion {
  id: string;
  name: string;
  genre: string;
  country: string;
  confidence: number;
  reason: string;
  image_url?: string;
}

const Discover = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState<AISuggestion[]>([]);
  const [loading, setLoading] = useState(false);

  const handleAISearch = async () => {
    if (!searchQuery.trim()) {
      toast.error('Please enter a search query');
      return;
    }

    setLoading(true);
    
    // Simulate AI API call
    setTimeout(() => {
      const mockSuggestions: AISuggestion[] = [
        {
          id: '1',
          name: 'Diljit Dosanjh',
          genre: 'Punjabi Singer',
          country: 'India',
          confidence: 95,
          reason: 'Popular Punjabi singer who has performed internationally including Coachella',
          image_url: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400'
        },
        {
          id: '2',
          name: 'AP Dhillon',
          genre: 'Punjabi Hip-Hop',
          country: 'Canada',
          confidence: 88,
          reason: 'Rising Punjabi artist with international recognition',
          image_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400'
        },
        {
          id: '3',
          name: 'Sidhu Moose Wala',
          genre: 'Punjabi Rap',
          country: 'India',
          confidence: 82,
          reason: 'Legendary Punjabi rapper with massive global following',
          image_url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400'
        }
      ];
      
      setSuggestions(mockSuggestions);
      setLoading(false);
      toast.success(`Found ${mockSuggestions.length} AI suggestions!`);
    }, 2000);
  };

  const handleSelectCelebrity = (suggestion: AISuggestion) => {
    toast.success(`Selected ${suggestion.name} for onboarding!`);
    // In real app, this would navigate to celebrity signup with pre-filled data
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
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
            <Link to="/auth">
              <Button>Sign In</Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Sparkles className="h-12 w-12 text-purple-600 mr-3" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              AI Celebrity Discovery
            </h1>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Describe any celebrity using natural language and let our AI find the perfect matches for you.
          </p>
        </div>

        {/* Search Section */}
        <Card className="max-w-4xl mx-auto mb-12">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Search className="h-5 w-5 mr-2" />
              Intelligent Celebrity Search
            </CardTitle>
            <CardDescription>
              Try: "Punjabi Singer from India who performed at Coachella" or "Bollywood actress in Hollywood movies"
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex space-x-4">
              <Input
                placeholder="Describe the celebrity you're looking for..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1"
                onKeyPress={(e) => e.key === 'Enter' && handleAISearch()}
              />
              <Button 
                onClick={handleAISearch}
                disabled={loading}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
              >
                {loading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Searching...
                  </div>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4 mr-2" />
                    AI Search
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Results Section */}
        {suggestions.length > 0 && (
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-center">AI Suggestions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {suggestions.map((suggestion) => (
                <Card key={suggestion.id} className="hover:shadow-lg transition-all hover:scale-105">
                  <CardHeader className="text-center pb-4">
                    <div className="relative mx-auto mb-4">
                      <Avatar className="w-20 h-20 mx-auto">
                        <AvatarImage src={suggestion.image_url} alt={suggestion.name} />
                        <AvatarFallback>{suggestion.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <Badge 
                        variant="secondary" 
                        className="absolute -top-2 -right-2 bg-green-100 text-green-800"
                      >
                        {suggestion.confidence}% match
                      </Badge>
                    </div>
                    <CardTitle className="text-lg">{suggestion.name}</CardTitle>
                    <CardDescription>
                      {suggestion.genre} • {suggestion.country}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-sm text-gray-600 bg-blue-50 p-3 rounded-lg">
                      <span className="font-medium">AI Analysis:</span>
                      <p className="mt-1">{suggestion.reason}</p>
                    </div>
                    <div className="space-y-2">
                      <Button 
                        className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                        onClick={() => handleSelectCelebrity(suggestion)}
                      >
                        Select for Onboarding
                      </Button>
                      <Link to={`/celebrity/${suggestion.id}`}>
                        <Button variant="outline" className="w-full">
                          View Profile
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Example Queries */}
        <div className="max-w-4xl mx-auto mt-16">
          <h3 className="text-xl font-bold mb-6 text-center">Try These Example Searches</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              "K-pop girl group member with purple hair",
              "British actor who played a superhero",
              "Latin American singer with Grammy awards",
              "Indian classical dancer turned actress",
              "American rapper from Atlanta",
              "Japanese anime voice actor"
            ].map((example, index) => (
              <Card 
                key={index} 
                className="cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => setSearchQuery(example)}
              >
                <CardContent className="p-4">
                  <p className="text-sm text-gray-600">"{example}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Discover;
