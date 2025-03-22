
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Copy, Check, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const Documentation = () => {
  const [copiedSnippets, setCopiedSnippets] = useState<Record<string, boolean>>({});

  const copyCode = (id: string, code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedSnippets(prev => ({ ...prev, [id]: true }));
    
    setTimeout(() => {
      setCopiedSnippets(prev => ({ ...prev, [id]: false }));
    }, 2000);
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6">
      <Tabs defaultValue="quickstart" className="w-full">
        <div className="mb-6">
          <TabsList className="grid grid-cols-1 sm:grid-cols-4 w-full">
            <TabsTrigger value="quickstart">Quickstart</TabsTrigger>
            <TabsTrigger value="authentication">Authentication</TabsTrigger>
            <TabsTrigger value="endpoints">Endpoints</TabsTrigger>
            <TabsTrigger value="sdks">SDKs</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="quickstart" className="animate-fade-in">
          <Card>
            <CardHeader>
              <CardTitle>Quickstart Guide</CardTitle>
              <CardDescription>Get up and running with the Traffic Manager API in minutes</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <h3 className="text-lg font-semibold">1. Generate your API keys</h3>
                <p className="text-sm text-muted-foreground">
                  Start by generating both a publishable and secret API key from your dashboard.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-semibold">2. Install the SDK (optional)</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  We provide client libraries for popular programming languages.
                </p>
                
                <CodeBlock
                  language="bash"
                  code="npm install @traffic-manager/sdk"
                  onCopy={() => copyCode('install', 'npm install @traffic-manager/sdk')}
                  isCopied={copiedSnippets['install']}
                />
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-semibold">3. Make your first API call</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  Initialize the SDK with your API key and make a simple request.
                </p>
                
                <CodeBlock
                  language="javascript"
                  code={`import { TrafficManager } from '@traffic-manager/sdk';

// Initialize with your API key
const trafficManager = new TrafficManager('pk_test_abc123');

// Get traffic statistics for your application
async function getTrafficStats() {
  try {
    const stats = await trafficManager.stats.get();
    console.log(stats);
  } catch (error) {
    console.error('Error fetching traffic stats:', error);
  }
}`}
                  onCopy={() => copyCode('first-call', `import { TrafficManager } from '@traffic-manager/sdk';

// Initialize with your API key
const trafficManager = new TrafficManager('pk_test_abc123');

// Get traffic statistics for your application
async function getTrafficStats() {
  try {
    const stats = await trafficManager.stats.get();
    console.log(stats);
  } catch (error) {
    console.error('Error fetching traffic stats:', error);
  }
}`)}
                  isCopied={copiedSnippets['first-call']}
                />
              </div>

              <div className="pt-4">
                <Button variant="outline" asChild>
                  <a href="#/docs">
                    View full documentation
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="authentication" className="animate-fade-in">
          <Card>
            <CardHeader>
              <CardTitle>Authentication</CardTitle>
              <CardDescription>Learn how to authenticate your API requests</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <h3 className="text-lg font-semibold">API Key Authentication</h3>
                <p className="text-sm text-muted-foreground">
                  The Traffic Manager API uses API keys to authenticate requests. You can view and manage your API keys in the API keys section.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-semibold">Authorization Header</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  Include your API key in the Authorization header of your HTTP requests.
                </p>
                
                <CodeBlock
                  language="bash"
                  code="Authorization: Bearer sk_test_xyz789"
                  onCopy={() => copyCode('auth-header', 'Authorization: Bearer sk_test_xyz789')}
                  isCopied={copiedSnippets['auth-header']}
                />
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-semibold">Query Parameter (Alternative)</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  Alternatively, you can provide your API key as a query parameter.
                </p>
                
                <CodeBlock
                  language="bash"
                  code="https://api.trafficmanager.com/v1/metrics?api_key=pk_test_abc123"
                  onCopy={() => copyCode('query-param', 'https://api.trafficmanager.com/v1/metrics?api_key=pk_test_abc123')}
                  isCopied={copiedSnippets['query-param']}
                />
                
                <div className="mt-2 p-3 bg-yellow-50 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-200 text-sm rounded-md">
                  <strong>Note:</strong> Using the query parameter method is less secure and not recommended for server-side API calls.
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="endpoints" className="animate-fade-in">
          <Card>
            <CardHeader>
              <CardTitle>API Endpoints</CardTitle>
              <CardDescription>Overview of available API endpoints and their functionality</CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold border-b pb-2">Traffic Metrics</h3>
                
                <ApiEndpoint
                  method="GET"
                  endpoint="/v1/metrics"
                  description="Retrieve traffic metrics for your application"
                  example={`curl https://api.trafficmanager.com/v1/metrics \\
  -H 'Authorization: Bearer sk_test_xyz789'`}
                  onCopy={() => copyCode('metrics-example', `curl https://api.trafficmanager.com/v1/metrics \\
  -H 'Authorization: Bearer sk_test_xyz789'`)}
                  isCopied={copiedSnippets['metrics-example']}
                />
                
                <ApiEndpoint
                  method="GET"
                  endpoint="/v1/metrics/realtime"
                  description="Get real-time traffic metrics with second-by-second updates"
                  example={`curl https://api.trafficmanager.com/v1/metrics/realtime \\
  -H 'Authorization: Bearer sk_test_xyz789'`}
                  onCopy={() => copyCode('realtime-example', `curl https://api.trafficmanager.com/v1/metrics/realtime \\
  -H 'Authorization: Bearer sk_test_xyz789'`)}
                  isCopied={copiedSnippets['realtime-example']}
                />
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-semibold border-b pb-2">Rate Limits</h3>
                
                <ApiEndpoint
                  method="GET"
                  endpoint="/v1/rate-limits"
                  description="Retrieve current rate limit configuration"
                  example={`curl https://api.trafficmanager.com/v1/rate-limits \\
  -H 'Authorization: Bearer sk_test_xyz789'`}
                  onCopy={() => copyCode('rate-limits-example', `curl https://api.trafficmanager.com/v1/rate-limits \\
  -H 'Authorization: Bearer sk_test_xyz789'`)}
                  isCopied={copiedSnippets['rate-limits-example']}
                />
                
                <ApiEndpoint
                  method="POST"
                  endpoint="/v1/rate-limits"
                  description="Update rate limit configuration"
                  example={`curl -X POST https://api.trafficmanager.com/v1/rate-limits \\
  -H 'Authorization: Bearer sk_test_xyz789' \\
  -H 'Content-Type: application/json' \\
  -d '{
    "global_limit": 10000,
    "per_ip_limit": 100,
    "timeframe": "minute"
  }'`}
                  onCopy={() => copyCode('update-limits-example', `curl -X POST https://api.trafficmanager.com/v1/rate-limits \\
  -H 'Authorization: Bearer sk_test_xyz789' \\
  -H 'Content-Type: application/json' \\
  -d '{
    "global_limit": 10000,
    "per_ip_limit": 100,
    "timeframe": "minute"
  }'`)}
                  isCopied={copiedSnippets['update-limits-example']}
                />
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-semibold border-b pb-2">Traffic Rules</h3>
                
                <ApiEndpoint
                  method="GET"
                  endpoint="/v1/rules"
                  description="List all traffic rules"
                  example={`curl https://api.trafficmanager.com/v1/rules \\
  -H 'Authorization: Bearer sk_test_xyz789'`}
                  onCopy={() => copyCode('rules-example', `curl https://api.trafficmanager.com/v1/rules \\
  -H 'Authorization: Bearer sk_test_xyz789'`)}
                  isCopied={copiedSnippets['rules-example']}
                />
                
                <ApiEndpoint
                  method="POST"
                  endpoint="/v1/rules"
                  description="Create a new traffic rule"
                  example={`curl -X POST https://api.trafficmanager.com/v1/rules \\
  -H 'Authorization: Bearer sk_test_xyz789' \\
  -H 'Content-Type: application/json' \\
  -d '{
    "name": "Block Suspicious IPs",
    "conditions": [{
      "type": "ip_address",
      "operator": "in",
      "value": ["192.168.1.1", "10.0.0.1"]
    }],
    "action": "block",
    "priority": 1
  }'`}
                  onCopy={() => copyCode('create-rule-example', `curl -X POST https://api.trafficmanager.com/v1/rules \\
  -H 'Authorization: Bearer sk_test_xyz789' \\
  -H 'Content-Type: application/json' \\
  -d '{
    "name": "Block Suspicious IPs",
    "conditions": [{
      "type": "ip_address",
      "operator": "in",
      "value": ["192.168.1.1", "10.0.0.1"]
    }],
    "action": "block",
    "priority": 1
  }'`)}
                  isCopied={copiedSnippets['create-rule-example']}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sdks" className="animate-fade-in">
          <Card>
            <CardHeader>
              <CardTitle>SDK Libraries</CardTitle>
              <CardDescription>Official client libraries for popular programming languages</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <SdkCard
                  language="JavaScript"
                  installCommand="npm install @traffic-manager/sdk"
                  docsUrl="#/docs/js"
                  onCopy={() => copyCode('js-install', 'npm install @traffic-manager/sdk')}
                  isCopied={copiedSnippets['js-install']}
                />
                
                <SdkCard
                  language="Python"
                  installCommand="pip install traffic-manager"
                  docsUrl="#/docs/python"
                  onCopy={() => copyCode('python-install', 'pip install traffic-manager')}
                  isCopied={copiedSnippets['python-install']}
                />
                
                <SdkCard
                  language="Ruby"
                  installCommand="gem install traffic_manager"
                  docsUrl="#/docs/ruby"
                  onCopy={() => copyCode('ruby-install', 'gem install traffic_manager')}
                  isCopied={copiedSnippets['ruby-install']}
                />
                
                <SdkCard
                  language="PHP"
                  installCommand="composer require traffic-manager/sdk"
                  docsUrl="#/docs/php"
                  onCopy={() => copyCode('php-install', 'composer require traffic-manager/sdk')}
                  isCopied={copiedSnippets['php-install']}
                />
                
                <SdkCard
                  language="Go"
                  installCommand="go get github.com/traffic-manager/sdk-go"
                  docsUrl="#/docs/go"
                  onCopy={() => copyCode('go-install', 'go get github.com/traffic-manager/sdk-go')}
                  isCopied={copiedSnippets['go-install']}
                />
                
                <SdkCard
                  language="Java"
                  installCommand={`<dependency>
  <groupId>com.trafficmanager</groupId>
  <artifactId>sdk</artifactId>
  <version>1.0.0</version>
</dependency>`}
                  docsUrl="#/docs/java"
                  onCopy={() => copyCode('java-install', `<dependency>
  <groupId>com.trafficmanager</groupId>
  <artifactId>sdk</artifactId>
  <version>1.0.0</version>
</dependency>`)}
                  isCopied={copiedSnippets['java-install']}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

interface CodeBlockProps {
  language: string;
  code: string;
  onCopy: () => void;
  isCopied: boolean;
}

const CodeBlock = ({ language, code, onCopy, isCopied }: CodeBlockProps) => (
  <div className="relative">
    <pre className="code-block overflow-x-auto text-sm p-4 bg-gray-950 text-gray-50 rounded-md">
      <code>
        {code.split('\n').map((line, i) => (
          <span key={i} className="code-line">
            {line}
          </span>
        ))}
      </code>
    </pre>
    <Button
      variant="ghost"
      size="icon"
      className="absolute top-2 right-2 h-7 w-7 bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-white"
      onClick={onCopy}
    >
      {isCopied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
    </Button>
  </div>
);

interface ApiEndpointProps {
  method: string;
  endpoint: string;
  description: string;
  example: string;
  onCopy: () => void;
  isCopied: boolean;
}

const ApiEndpoint = ({ method, endpoint, description, example, onCopy, isCopied }: ApiEndpointProps) => (
  <div className="border rounded-md p-4">
    <div className="flex flex-wrap items-start gap-2 mb-2">
      <span className={cn(
        "px-2 py-1 text-xs font-medium rounded",
        method === "GET" ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300" :
        method === "POST" ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300" :
        method === "PUT" ? "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300" :
        method === "DELETE" ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300" :
        "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300"
      )}>
        {method}
      </span>
      <code className="text-sm font-mono px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded">
        {endpoint}
      </code>
    </div>
    <p className="text-sm text-muted-foreground mb-3">{description}</p>
    <div className="mt-2">
      <h4 className="text-xs font-semibold uppercase text-muted-foreground mb-2">Example Request</h4>
      <CodeBlock
        language="bash"
        code={example}
        onCopy={onCopy}
        isCopied={isCopied}
      />
    </div>
  </div>
);

interface SdkCardProps {
  language: string;
  installCommand: string;
  docsUrl: string;
  onCopy: () => void;
  isCopied: boolean;
}

const SdkCard = ({ language, installCommand, docsUrl, onCopy, isCopied }: SdkCardProps) => (
  <div className="border rounded-md p-4">
    <h3 className="text-lg font-semibold mb-2">{language}</h3>
    <div className="mb-3">
      <CodeBlock
        language="bash"
        code={installCommand}
        onCopy={onCopy}
        isCopied={isCopied}
      />
    </div>
    <Button variant="outline" size="sm" asChild className="w-full">
      <a href={docsUrl}>View Documentation</a>
    </Button>
  </div>
);

export default Documentation;
