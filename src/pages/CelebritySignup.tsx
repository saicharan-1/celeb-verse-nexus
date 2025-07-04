
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { 
  Star, 
  Crown, 
  ArrowLeft, 
  Sparkles, 
  Instagram, 
  Youtube, 
  Twitter,
  Upload,
  CheckCircle
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

interface CelebrityFormData {
  name: string;
  genre: string;
  country: string;
  bio: string;
  email: string;
  password: string;
  instagram: string;
  youtube: string;
  twitter: string;
  fanbaseCount: string;
  setlist: string;
}

const CelebritySignup = () => {
  const [formData, setFormData] = useState<CelebrityFormData>({
    name: '',
    genre: '',
    country: '',
    bio: '',
    email: '',
    password: '',
    instagram: '',
    youtube: '',
    twitter: '',
    fanbaseCount: '',
    setlist: ''
  });
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [aiSuggestions, setAiSuggestions] = useState<any[]>([]);
  const navigate = useNavigate();

  const totalSteps = 4;

  const handleAISearch = async () => {
    if (!formData.name) {
      toast.error('Please enter your name first');
      return;
    }

    setIsLoading(true);
    
    // Simulate AI API call for auto-fill
    setTimeout(() => {
      const mockData = {
        genre: 'Punjabi Singer',
        country: 'India',
        bio: `${formData.name} is a talented artist known for captivating performances and unique style. With a growing fanbase and distinctive sound, they continue to make waves in the entertainment industry.`,
        instagram: `@${formData.name.toLowerCase().replace(/\s+/g, '')}`,
        youtube: `${formData.name.replace(/\s+/g, '')}Official`,
        fanbaseCount: '50000',
        setlist: 'Original Song 1, Cover Song 2, Hit Single 3'
      };

      setFormData(prev => ({
        ...prev,
        ...mockData
      }));

      setIsLoading(false);
      toast.success('Profile auto-filled with AI suggestions!');
    }, 2000);
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    
    // Simulate account creation
    setTimeout(() => {
      toast.success(`Welcome to CelebNetwork, ${formData.name}!`);
      navigate('/celebrity/dashboard');
    }, 2000);
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return formData.name && formData.genre && formData.country;
      case 2:
        return formData.bio;
      case 3:
        return formData.email && formData.password;
      case 4:
        return true; // Optional step
      default:
        return false;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b">
        <div className="container mx-auto px-4 py-4">
          <Link to="/auth" className="flex items-center space-x-3">
            <ArrowLeft className="h-5 w-5" />
            <div className="flex items-center space-x-2">
              <Star className="h-8 w-8 text-purple-600" />
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                CelebNetwork
              </h1>
            </div>
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <Crown className="h-12 w-12 text-purple-600 mr-3" />
              <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Join as Celebrity
              </h1>
            </div>
            <p className="text-xl text-gray-600">
              Showcase your talent and connect with fans worldwide
            </p>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Step {currentStep} of {totalSteps}</span>
              <span className="text-sm text-gray-600">{Math.round((currentStep / totalSteps) * 100)}% Complete</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-purple-600 to-pink-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(currentStep / totalSteps) * 100}%` }}
              ></div>
            </div>
          </div>

          <Card>
            <CardContent className="p-8">
              {/* Step 1: Basic Information */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <div className="text-center mb-6">
                    <h2 className="text-2xl font-bold mb-2">Basic Information</h2>
                    <p className="text-gray-600">Let's start with your basic details</p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="name">Stage Name *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        placeholder="Your stage or professional name"
                        required
                      />
                    </div>

                    <div className="flex space-x-4">
                      <div className="flex-1">
                        <Label htmlFor="genre">Genre/Category *</Label>
                        <Input
                          id="genre"
                          value={formData.genre}
                          onChange={(e) => setFormData({...formData, genre: e.target.value})}
                          placeholder="e.g., Singer, Actor, Dancer"
                          required
                        />
                      </div>
                      <div className="flex-1">
                        <Label htmlFor="country">Country *</Label>
                        <Input
                          id="country"
                          value={formData.country}
                          onChange={(e) => setFormData({...formData, country: e.target.value})}
                          placeholder="Your country"
                          required
                        />
                      </div>
                    </div>

                    <Button 
                      onClick={handleAISearch}
                      disabled={isLoading || !formData.name}
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                    >
                      {isLoading ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          AI Auto-filling Profile...
                        </>
                      ) : (
                        <>
                          <Sparkles className="h-4 w-4 mr-2" />
                          AI Auto-fill Profile
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              )}

              {/* Step 2: Biography */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <div className="text-center mb-6">
                    <h2 className="text-2xl font-bold mb-2">Tell Your Story</h2>
                    <p className="text-gray-600">Share your biography and achievements</p>
                  </div>

                  <div>
                    <Label htmlFor="bio">Biography *</Label>
                    <Textarea
                      id="bio"
                      value={formData.bio}
                      onChange={(e) => setFormData({...formData, bio: e.target.value})}
                      placeholder="Tell your fans about your journey, achievements, and what makes you unique..."
                      rows={6}
                      required
                    />
                    <p className="text-sm text-gray-500 mt-2">
                      This will be displayed on your public profile
                    </p>
                  </div>

                  <div>
                    <Label htmlFor="setlist">Popular Content/Songs</Label>
                    <Input
                      id="setlist"
                      value={formData.setlist}
                      onChange={(e) => setFormData({...formData, setlist: e.target.value})}
                      placeholder="List your popular songs, shows, or content (comma separated)"
                    />
                  </div>
                </div>
              )}

              {/* Step 3: Account Setup */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <div className="text-center mb-6">
                    <h2 className="text-2xl font-bold mb-2">Account Setup</h2>
                    <p className="text-gray-600">Create your secure account</p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        placeholder="your@email.com"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="password">Password *</Label>
                      <Input
                        id="password"
                        type="password"
                        value={formData.password}
                        onChange={(e) => setFormData({...formData, password: e.target.value})}
                        placeholder="Create a strong password"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="fanbase">Estimated Fanbase Count</Label>
                      <Input
                        id="fanbase"
                        value={formData.fanbaseCount}
                        onChange={(e) => setFormData({...formData, fanbaseCount: e.target.value})}
                        placeholder="e.g., 50000"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 4: Social Media */}
              {currentStep === 4 && (
                <div className="space-y-6">
                  <div className="text-center mb-6">
                    <h2 className="text-2xl font-bold mb-2">Connect Social Media</h2>
                    <p className="text-gray-600">Link your social accounts (optional)</p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="instagram" className="flex items-center">
                        <Instagram className="h-4 w-4 mr-2 text-pink-500" />
                        Instagram Handle
                      </Label>
                      <Input
                        id="instagram"
                        value={formData.instagram}
                        onChange={(e) => setFormData({...formData, instagram: e.target.value})}
                        placeholder="@yourusername"
                      />
                    </div>

                    <div>
                      <Label htmlFor="youtube" className="flex items-center">
                        <Youtube className="h-4 w-4 mr-2 text-red-500" />
                        YouTube Channel
                      </Label>
                      <Input
                        id="youtube"
                        value={formData.youtube}
                        onChange={(e) => setFormData({...formData, youtube: e.target.value})}
                        placeholder="YourChannelName"
                      />
                    </div>

                    <div>
                      <Label htmlFor="twitter" className="flex items-center">
                        <Twitter className="h-4 w-4 mr-2 text-blue-500" />
                        Twitter Handle
                      </Label>
                      <Input
                        id="twitter"
                        value={formData.twitter}
                        onChange={(e) => setFormData({...formData, twitter: e.target.value})}
                        placeholder="@yourusername"
                      />
                    </div>

                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                      <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-600">Upload Profile Picture</p>
                      <p className="text-xs text-gray-500">PNG, JPG up to 10MB</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8">
                <Button 
                  variant="outline" 
                  onClick={prevStep}
                  disabled={currentStep === 1}
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Previous
                </Button>

                {currentStep < totalSteps ? (
                  <Button 
                    onClick={nextStep}
                    disabled={!isStepValid()}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                  >
                    Next Step
                    <CheckCircle className="h-4 w-4 ml-2" />
                  </Button>
                ) : (
                  <Button 
                    onClick={handleSubmit}
                    disabled={isLoading}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                  >
                    {isLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Creating Account...
                      </>
                    ) : (
                      <>
                        <Crown className="h-4 w-4 mr-2" />
                        Create Celebrity Account
                      </>
                    )}
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Benefits */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="text-center p-6">
              <Star className="h-8 w-8 text-yellow-500 mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Verified Profile</h3>
              <p className="text-sm text-gray-600">Get a verified badge and official status</p>
            </Card>
            <Card className="text-center p-6">
              <Sparkles className="h-8 w-8 text-purple-500 mx-auto mb-3" />
              <h3 className="font-semibold mb-2">AI-Powered</h3>
              <p className="text-sm text-gray-600">Smart profile optimization and fan insights</p>
            </Card>
            <Card className="text-center p-6">
              <Crown className="h-8 w-8 text-pink-500 mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Global Reach</h3>
              <p className="text-sm text-gray-600">Connect with fans worldwide</p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CelebritySignup;
