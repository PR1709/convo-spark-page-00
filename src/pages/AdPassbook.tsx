
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { Slider } from '@/components/ui/slider';
import { Users, MapPin, Calendar, Percent, Info } from 'lucide-react';

const AdPassbook = () => {
  const [campaignName, setCampaignName] = useState('');
  const [targetGender, setTargetGender] = useState('');
  const [maritalStatus, setMaritalStatus] = useState('');
  const [ageRange, setAgeRange] = useState([18, 65]);
  const [selectedProfessions, setSelectedProfessions] = useState<string[]>([]);
  const [location, setLocation] = useState('');
  const [targetAudience, setTargetAudience] = useState(10000);
  const [budget, setBudget] = useState(500);
  const [adDescription, setAdDescription] = useState('');

  const professions = [
    'Software Engineer', 'Doctor', 'Teacher', 'Student', 'Business Owner',
    'Marketing Professional', 'Designer', 'Lawyer', 'Consultant', 'Other'
  ];

  const handleProfessionChange = (profession: string, checked: boolean) => {
    if (checked) {
      setSelectedProfessions([...selectedProfessions, profession]);
    } else {
      setSelectedProfessions(selectedProfessions.filter(p => p !== profession));
    }
  };

  const estimatedReach = Math.floor(targetAudience * 0.15); // 15% estimated reach
  const costPerClick = budget / estimatedReach || 0;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Ad Passbook</h1>
          <p className="text-gray-600">Create and manage your targeted advertising campaigns</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Campaign Details */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Info className="h-5 w-5" />
                  Campaign Details
                </CardTitle>
                <CardDescription>Basic information about your advertising campaign</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="campaign-name">Campaign Name</Label>
                  <Input
                    id="campaign-name"
                    value={campaignName}
                    onChange={(e) => setCampaignName(e.target.value)}
                    placeholder="Enter campaign name"
                  />
                </div>
                <div>
                  <Label htmlFor="ad-description">Ad Description</Label>
                  <Textarea
                    id="ad-description"
                    value={adDescription}
                    onChange={(e) => setAdDescription(e.target.value)}
                    placeholder="Describe your advertisement"
                    className="min-h-[100px]"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Target Demographics */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Target Demographics
                </CardTitle>
                <CardDescription>Define your target audience characteristics</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Gender */}
                <div>
                  <Label className="text-base font-medium">Target Gender</Label>
                  <RadioGroup value={targetGender} onValueChange={setTargetGender} className="mt-2">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="male" id="male" />
                      <Label htmlFor="male">Male</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="female" id="female" />
                      <Label htmlFor="female">Female</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="all" id="all" />
                      <Label htmlFor="all">All Genders</Label>
                    </div>
                  </RadioGroup>
                </div>

                {/* Marital Status */}
                <div>
                  <Label htmlFor="marital-status">Marital Status</Label>
                  <Select value={maritalStatus} onValueChange={setMaritalStatus}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select marital status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="single">Single</SelectItem>
                      <SelectItem value="married">Married</SelectItem>
                      <SelectItem value="divorced">Divorced</SelectItem>
                      <SelectItem value="all">All</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Age Range */}
                <div>
                  <Label className="text-base font-medium">Age Range: {ageRange[0]} - {ageRange[1]} years</Label>
                  <div className="mt-4 px-2">
                    <Slider
                      value={ageRange}
                      onValueChange={setAgeRange}
                      max={80}
                      min={13}
                      step={1}
                      className="w-full"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Professional & Location */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Professional & Location
                </CardTitle>
                <CardDescription>Target specific professions and locations</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Professions */}
                <div>
                  <Label className="text-base font-medium mb-3 block">Target Professions</Label>
                  <div className="grid grid-cols-2 gap-3">
                    {professions.map((profession) => (
                      <div key={profession} className="flex items-center space-x-2">
                        <Checkbox
                          id={profession}
                          checked={selectedProfessions.includes(profession)}
                          onCheckedChange={(checked) => handleProfessionChange(profession, checked as boolean)}
                        />
                        <Label htmlFor={profession} className="text-sm">{profession}</Label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Location */}
                <div>
                  <Label htmlFor="location">Target Location</Label>
                  <Input
                    id="location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Enter city, state, or country"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Budget & Targeting */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Percent className="h-5 w-5" />
                  Budget & Audience Size
                </CardTitle>
                <CardDescription>Set your budget and target audience size</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Target Audience Size */}
                <div>
                  <Label className="text-base font-medium">Target Audience Size: {targetAudience.toLocaleString()} people</Label>
                  <div className="mt-4 px-2">
                    <Slider
                      value={[targetAudience]}
                      onValueChange={(value) => setTargetAudience(value[0])}
                      max={1000000}
                      min={1000}
                      step={1000}
                      className="w-full"
                    />
                  </div>
                </div>

                {/* Budget */}
                <div>
                  <Label htmlFor="budget">Campaign Budget ($)</Label>
                  <Input
                    id="budget"
                    type="number"
                    value={budget}
                    onChange={(e) => setBudget(Number(e.target.value))}
                    placeholder="Enter budget amount"
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Summary Panel */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Campaign Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Target Audience:</span>
                    <span className="font-medium">{targetAudience.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Estimated Reach:</span>
                    <span className="font-medium">{estimatedReach.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Total Budget:</span>
                    <span className="font-medium">${budget}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Cost per Click:</span>
                    <span className="font-medium">${costPerClick.toFixed(2)}</span>
                  </div>
                </div>
                
                <div className="pt-4 border-t">
                  <h4 className="font-medium mb-2">Target Demographics:</h4>
                  <div className="text-sm space-y-1">
                    <p><strong>Gender:</strong> {targetGender || 'Not selected'}</p>
                    <p><strong>Age:</strong> {ageRange[0]}-{ageRange[1]} years</p>
                    <p><strong>Marital Status:</strong> {maritalStatus || 'Not selected'}</p>
                    <p><strong>Location:</strong> {location || 'Not specified'}</p>
                    <p><strong>Professions:</strong> {selectedProfessions.length > 0 ? selectedProfessions.join(', ') : 'None selected'}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-3">
              <Button className="w-full" size="lg">
                Create Campaign
              </Button>
              <Button variant="outline" className="w-full">
                Save as Draft
              </Button>
              <Button variant="ghost" className="w-full">
                Preview Ad
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdPassbook;
