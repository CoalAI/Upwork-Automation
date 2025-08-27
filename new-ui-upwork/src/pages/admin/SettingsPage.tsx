import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import RelevanceCheckToggle from "@/components/RelevanceCheckToggle";
import { Play, Info, RefreshCw, AlertTriangle } from "lucide-react";
import { apiClient } from "@/lib/api";

const SettingsPage = () => {


  
  // Manual job processing state
  const [isProcessingJobs, setIsProcessingJobs] = useState(false);
  const [processingStatus, setProcessingStatus] = useState<string | null>(null);
  const [processingResult, setProcessingResult] = useState<any>(null);



  // Manual job processing handler
  const handleManualJobProcessing = async () => {
    setIsProcessingJobs(true);
    setProcessingStatus(null);
    setProcessingResult(null);

    try {
      const data = await apiClient.processNewJobsCron();
      setProcessingResult(data);
      setProcessingStatus('success');
    } catch (err: any) {
      setProcessingResult({ error: err.message });
      setProcessingStatus('error');
      console.error('Error processing jobs:', err);
    } finally {
      setIsProcessingJobs(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 py-8 px-4">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2">Settings</h1>
        <p className="text-muted-foreground">
          Manage your application settings and configurations
        </p>
      </div>

      {/* Relevance Check Section */}
      <RelevanceCheckToggle />

      {/* Manual Job Processing Section - FOR TESTING ONLY */}
      <Card className="border-amber-200 bg-amber-50/30">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-amber-800">
            <AlertTriangle className="h-5 w-5" />
            <span>Manual Job Processing - TESTING ONLY</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert variant="destructive" className="border-amber-300 bg-amber-100 text-amber-800">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              <strong>⚠️ WARNING:</strong> This feature is for testing purposes only. 
              It will manually trigger the job processing cron job that normally runs automatically.
              Use only when you need to test the relevance analysis system outside of scheduled hours.
            </AlertDescription>
          </Alert>
          
          <div className="flex items-start space-x-2 p-3 bg-blue-50 rounded-lg">
            <Info className="h-4 w-4 text-blue-600 mt-0.5" />
            <div className="text-sm text-blue-800">
              <p className="font-medium">What this does:</p>
              <p>• Manually triggers the job processing system to analyze new jobs in the database</p>
              <p>• Processes jobs in batches of 3 for parallel analysis</p>
              <p>• Updates job relevance scores and stores results in the database</p>
              <p>• Only processes jobs that haven't been analyzed yet</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button
              onClick={handleManualJobProcessing}
              disabled={isProcessingJobs}
              variant="outline"
              className="flex items-center space-x-2 border-amber-300 text-amber-700 hover:bg-amber-100"
            >
              {isProcessingJobs ? (
                <>
                  <RefreshCw className="h-4 w-4 animate-spin" />
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <Play className="h-4 w-4" />
                  <span>Process New Jobs</span>
                </>
              )}
            </Button>
            
            {processingStatus && (
              <div className="text-sm">
                <span className="font-medium">Status: </span>
                <span className={processingStatus === "success" ? "text-green-600" : "text-red-600"}>
                  {processingStatus}
                </span>
              </div>
            )}
          </div>
          
          {processingResult && (
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-2">Processing Result:</h4>
              <pre className="text-xs text-gray-700 bg-white p-3 rounded border overflow-auto max-h-48">
                {JSON.stringify(processingResult, null, 2)}
              </pre>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Test Relevance Check Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Play className="h-5 w-5" />
            <span>Test Relevance Check</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-start space-x-2 p-3 bg-blue-50 rounded-lg">
            <Info className="h-4 w-4 text-blue-600 mt-0.5" />
            <div className="text-sm text-blue-800">
              <p className="font-medium">How it works:</p>
              <p>The relevance check automatically analyzes new jobs during scheduled hours (6:30 PM - 3:30 AM PKT) 
              and assigns relevance scores based on your company profile and team member skills.</p>
            </div>
          </div>
          
          <div className="text-sm text-muted-foreground">
            <p>• Jobs are automatically processed when they are fetched from Upwork</p>
            <p>• Each job receives a relevance score from 0.0 to 1.0</p>
            <p>• Jobs are categorized as Irrelevant, Low, Medium, or Strong match</p>
            <p>• The system considers technology match, portfolio match, project match, and location preferences</p>
          </div>
        </CardContent>
      </Card>


    </div>
  );
};

export default SettingsPage;
