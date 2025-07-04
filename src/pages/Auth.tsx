
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Star, Users, Crown, ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const Auth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (userType: 'fan' | 'celebrity', email: string, password: string) => {
    setIsLoading(true);
    
    // Simulate authentication
    setTimeout(() => {
      if (email && password) {
        toast.success(`Welcome back, ${userType}!`);
        if (userType === 'celebrity') {
          navigate('/celebrity/dashboard');
        } else {
          navigate('/fan/dashboard');
        }
      } else {
        toast.error('Please fill in all fields');
      }
      setIsLoading(false);
    }, 1500);
  };

  const handleSignup = async (userType: 'fan' | 'celebrity', data: any) => {
    setIsLoading(true);
    
    setTimeout(() => {
      if (data.email && data.password && data.name) {
        toast.success(`Account created successfully! Welcome, ${data.name}!`);
        if (userType === 'celebrity') {
          navigate('/celebrity/dashboard');
        } else {
          navigate('/fan/dashboard');
        }
      } else {
        toast.error('Please fill in all fields');
      }
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b">
        <div className="container mx-auto px-4 py-4">
          <Link to="/" className="flex items-center space-x-3">
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
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Join CelebNetwork</h1>
            <p className="text-gray-600">Connect with celebrities or showcase your talent</p>
          </div>

          <Tabs defaultValue="fan" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="fan" className="flex items-center space-x-2">
                <Users className="h-4 w-4" />
                <span>Fan</span>
              </TabsTrigger>
              <TabsTrigger value="celebrity" className="flex items-center space-x-2">
                <Crown className="h-4 w-4" />
                <span>Celebrity</span>
              </TabsTrigger>
            </TabsList>

            {/* Fan Authentication */}
            <TabsContent value="fan">
              <Card>
                <CardHeader className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    <Users className="h-8 w-8 text-blue-600" />
                  </div>
                  <CardTitle>Fan Account</CardTitle>
                  <CardDescription>
                    Follow celebrities, get exclusive content, and engage with your favorite stars
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="login" className="w-full">
                    <TabsList className="grid w-full grid-cols-2 mb-6">
                      <TabsTrigger value="login">Sign In</TabsTrigger>
                      <TabsTrigger value="signup">Sign Up</TabsTrigger>
                    </TabsList>

                    <TabsContent value="login">
                      <FanLoginForm onSubmit={handleLogin} isLoading={isLoading} />
                    </TabsContent>

                    <TabsContent value="signup">
                      <FanSignupForm onSubmit={handleSignup} isLoading={isLoading} />
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Celebrity Authentication */}
            <TabsContent value="celebrity">
              <Card>
                <CardHeader className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    <Crown className="h-8 w-8 text-purple-600" />
                    <Badge variant="secondary" className="ml-2">Verified</Badge>
                  </div>
                  <CardTitle>Celebrity Account</CardTitle>
                  <CardDescription>
                    Showcase your talent, connect with fans, and manage your public profile
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="login" className="w-full">
                    <TabsList className="grid w-full grid-cols-2 mb-6">
                      <TabsTrigger value="login">Sign In</TabsTrigger>
                      <TabsTrigger value="signup">Sign Up</TabsTrigger>
                    </TabsList>

                    <TabsContent value="login">
                      <CelebrityLoginForm onSubmit={handleLogin} isLoading={isLoading} />
                    </TabsContent>

                    <TabsContent value="signup">
                      <CelebritySignupForm onSubmit={handleSignup} isLoading={isLoading} />
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

const FanLoginForm = ({ onSubmit, isLoading }: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <form onSubmit={(e) => { e.preventDefault(); onSubmit('fan', email, password); }} className="space-y-4">
      <div>
        <Label htmlFor="fan-email">Email</Label>
        <Input
          id="fan-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="fan@example.com"
          required
        />
      </div>
      <div>
        <Label htmlFor="fan-password">Password</Label>
        <Input
          id="fan-password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? 'Signing In...' : 'Sign In'}
      </Button>
    </form>
  );
};

const FanSignupForm = ({ onSubmit, isLoading }: any) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    onSubmit('fan', formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="fan-name">Full Name</Label>
        <Input
          id="fan-name"
          value={formData.name}
          onChange={(e) => setFormData({...formData, name: e.target.value})}
          placeholder="John Doe"
          required
        />
      </div>
      <div>
        <Label htmlFor="fan-signup-email">Email</Label>
        <Input
          id="fan-signup-email"
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({...formData, email: e.target.value})}
          placeholder="fan@example.com"
          required
        />
      </div>
      <div>
        <Label htmlFor="fan-signup-password">Password</Label>
        <Input
          id="fan-signup-password"
          type="password"
          value={formData.password}
          onChange={(e) => setFormData({...formData, password: e.target.value})}
          required
        />
      </div>
      <div>
        <Label htmlFor="fan-confirm-password">Confirm Password</Label>
        <Input
          id="fan-confirm-password"
          type="password"
          value={formData.confirmPassword}
          onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
          required
        />
      </div>
      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? 'Creating Account...' : 'Create Fan Account'}
      </Button>
    </form>
  );
};

const CelebrityLoginForm = ({ onSubmit, isLoading }: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <form onSubmit={(e) => { e.preventDefault(); onSubmit('celebrity', email, password); }} className="space-y-4">
      <div>
        <Label htmlFor="celeb-email">Email</Label>
        <Input
          id="celeb-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="celebrity@example.com"
          required
        />
      </div>
      <div>
        <Label htmlFor="celeb-password">Password</Label>
        <Input
          id="celeb-password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <Button type="submit" className="w-full bg-gradient-to-r from-purple-600 to-pink-600" disabled={isLoading}>
        {isLoading ? 'Signing In...' : 'Sign In'}
      </Button>
    </form>
  );
};

const CelebritySignupForm = ({ onSubmit, isLoading }: any) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    genre: '',
    country: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    onSubmit('celebrity', formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="celeb-name">Stage Name</Label>
        <Input
          id="celeb-name"
          value={formData.name}
          onChange={(e) => setFormData({...formData, name: e.target.value})}
          placeholder="Your Stage Name"
          required
        />
      </div>
      <div>
        <Label htmlFor="celeb-genre">Genre/Category</Label>
        <Input
          id="celeb-genre"
          value={formData.genre}
          onChange={(e) => setFormData({...formData, genre: e.target.value})}
          placeholder="e.g., Singer, Actor, Dancer"
          required
        />
      </div>
      <div>
        <Label htmlFor="celeb-country">Country</Label>
        <Input
          id="celeb-country"
          value={formData.country}
          onChange={(e) => setFormData({...formData, country: e.target.value})}
          placeholder="Your Country"
          required
        />
      </div>
      <div>
        <Label htmlFor="celeb-signup-email">Email</Label>
        <Input
          id="celeb-signup-email"
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({...formData, email: e.target.value})}
          placeholder="celebrity@example.com"
          required
        />
      </div>
      <div>
        <Label htmlFor="celeb-signup-password">Password</Label>
        <Input
          id="celeb-signup-password"
          type="password"
          value={formData.password}
          onChange={(e) => setFormData({...formData, password: e.target.value})}
          required
        />
      </div>
      <div>
        <Label htmlFor="celeb-confirm-password">Confirm Password</Label>
        <Input
          id="celeb-confirm-password"
          type="password"
          value={formData.confirmPassword}
          onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
          required
        />
      </div>
      <Button type="submit" className="w-full bg-gradient-to-r from-purple-600 to-pink-600" disabled={isLoading}>
        {isLoading ? 'Creating Account...' : 'Create Celebrity Account'}
      </Button>
    </form>
  );
};

export default Auth;
