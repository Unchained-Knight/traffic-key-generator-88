
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { KeyRound, Copy, CheckCircle, RefreshCw } from 'lucide-react';
import { generatePublishableKey, generateSecretKey, formatApiKey } from '@/utils/keyGenerator';
import { toast } from 'sonner';

const ApiGenerator = () => {
  const [publishableKey, setPublishableKey] = useState<string>('');
  const [secretKey, setSecretKey] = useState<string>('');
  const [copied, setCopied] = useState<{ [key: string]: boolean }>({
    publishable: false,
    secret: false,
  });
  const [loading, setLoading] = useState<{ [key: string]: boolean }>({
    publishable: false,
    secret: false,
  });

  const generateKeys = (type: 'publishable' | 'secret' | 'both') => {
    if (type === 'publishable' || type === 'both') {
      setLoading(prev => ({ ...prev, publishable: true }));
      
      // Simulate network request
      setTimeout(() => {
        const newKey = generatePublishableKey();
        setPublishableKey(newKey);
        setLoading(prev => ({ ...prev, publishable: false }));
        toast.success('Publishable API key generated');
      }, 800);
    }
    
    if (type === 'secret' || type === 'both') {
      setLoading(prev => ({ ...prev, secret: true }));
      
      // Simulate network request
      setTimeout(() => {
        const newKey = generateSecretKey();
        setSecretKey(newKey);
        setLoading(prev => ({ ...prev, secret: false }));
        toast.success('Secret API key generated');
      }, 1000);
    }
  };

  const copyToClipboard = (text: string, type: 'publishable' | 'secret') => {
    navigator.clipboard.writeText(text);
    setCopied({ ...copied, [type]: true });
    
    toast.success(`${type === 'publishable' ? 'Publishable' : 'Secret'} API key copied to clipboard`);
    
    setTimeout(() => {
      setCopied({ ...copied, [type]: false });
    }, 2000);
  };

  return (
    <div className="max-w-3xl mx-auto p-4 sm:p-6">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center p-2 mb-4 rounded-full bg-accent/10 text-accent">
          <KeyRound className="w-6 h-6" />
        </div>
        <h2 className="text-3xl font-bold mb-3">Generate Your API Keys</h2>
        <p className="text-muted-foreground max-w-lg mx-auto">
          Use these API keys to authenticate your requests to the Traffic Manager API. Keep your secret key confidential!
        </p>
      </div>

      <Card className="animate-fade-up">
        <CardHeader>
          <CardTitle>API Keys</CardTitle>
          <CardDescription>
            Generate both publishable and secret API keys for your integration.
          </CardDescription>
        </CardHeader>
        
        <Tabs defaultValue="publishable" className="w-full">
          <div className="px-6">
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="publishable">Publishable Key</TabsTrigger>
              <TabsTrigger value="secret">Secret Key</TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="publishable">
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="publishable-key">Publishable API Key</Label>
                <div className="flex">
                  <Input
                    id="publishable-key"
                    value={publishableKey ? formatApiKey(publishableKey) : ''}
                    placeholder="Your publishable key will appear here"
                    readOnly
                    className="font-mono text-sm"
                  />
                  <Button
                    variant="outline"
                    size="icon"
                    className="ml-2"
                    disabled={!publishableKey || copied.publishable}
                    onClick={() => copyToClipboard(publishableKey, 'publishable')}
                  >
                    {copied.publishable ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground">
                  Use this key for client-side API calls. It's safe to include in your frontend code.
                </p>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                onClick={() => generateKeys('publishable')} 
                className="w-full"
                disabled={loading.publishable}
              >
                {loading.publishable ? (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <KeyRound className="mr-2 h-4 w-4" />
                    Generate Publishable Key
                  </>
                )}
              </Button>
            </CardFooter>
          </TabsContent>
          
          <TabsContent value="secret">
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="secret-key">Secret API Key</Label>
                <div className="flex">
                  <Input
                    id="secret-key"
                    value={secretKey ? formatApiKey(secretKey, true) : ''}
                    placeholder="Your secret key will appear here"
                    readOnly
                    className="font-mono text-sm"
                  />
                  <Button
                    variant="outline"
                    size="icon"
                    className="ml-2"
                    disabled={!secretKey || copied.secret}
                    onClick={() => copyToClipboard(secretKey, 'secret')}
                  >
                    {copied.secret ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground">
                  <span className="text-red-500 font-medium">Never share this key.</span> Use it for server-side API calls only.
                </p>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                onClick={() => generateKeys('secret')} 
                className="w-full"
                disabled={loading.secret}
                variant="outline"
              >
                {loading.secret ? (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <KeyRound className="mr-2 h-4 w-4" />
                    Generate Secret Key
                  </>
                )}
              </Button>
            </CardFooter>
          </TabsContent>
        </Tabs>
      </Card>

      <div className="mt-8 text-center">
        <Button 
          onClick={() => generateKeys('both')} 
          className="mx-auto"
          disabled={loading.publishable || loading.secret}
        >
          {loading.publishable || loading.secret ? (
            <>
              <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
              Generating both keys...
            </>
          ) : (
            <>
              <KeyRound className="mr-2 h-4 w-4" />
              Generate Both Keys
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default ApiGenerator;
