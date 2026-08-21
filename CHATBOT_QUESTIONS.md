# Rule-Based Hospital Chatbot - Supported Questions

This chatbot can answer various questions about hospital data using rule-based pattern matching.

## Basic Questions ✅

### 1. Total Hospitals Count
**Question**: "How many total hospitals are there?"
**Response**: Returns total_hospitals value from dashboard_overview.json
**Example**: "There are currently 156 hospitals in our network."

### 2. Hospital Ratings
**Question**: "What is Apollo Hospitals' rating?"
**Response**: Searches hospitals.json for Apollo and returns rating
**Example**: "Apollo Hospitals has a rating of 4.8 out of 5.0."

### 3. Location-based Search
**Question**: "Which hospital is in Chennai?"
**Response**: Filters hospitals by location containing "Chennai"
**Example**: "The following hospitals are located in Chennai: Apollo Hospitals"

### 4. Bed Capacity
**Question**: "What is the bed capacity of AIIMS Delhi?"
**Response**: Finds AIIMS and returns bed count
**Example**: "AIIMS Delhi has a bed capacity of 2,478 beds."

### 5. High Priority Alerts
**Question**: "Is there any high priority alert?"
**Response**: Checks alerts for priority="high"
**Example**: "Yes, there are 2 high priority alerts: [details]"

### 6. Patient Satisfaction
**Question**: "What is the current patient satisfaction score?"
**Response**: Returns patient_satisfaction from dashboard
**Example**: "The current patient satisfaction score is 4.6 out of 5.0."

### 7. Specific Hospital Beds
**Question**: "How many beds does Fortis Healthcare have?"
**Response**: Finds Fortis and returns bed count
**Example**: "Fortis Healthcare has 425 beds with an occupancy rate of 91.2%."

### 8. Current Occupancy
**Question**: "What is today's occupancy rate?"
**Response**: Returns avg_occupancy_rate from dashboard
**Example**: "Today's average occupancy rate across all hospitals is 82.5%."

### 9. Accreditation Search
**Question**: "Which hospital has JCI accreditation?"
**Response**: Filters hospitals by accreditation="JCI"
**Example**: "The following hospitals have JCI accreditation: Apollo Hospitals, Max Healthcare"

### 10. Hospital Specialties
**Question**: "What specialties does Manipal Hospitals offer?"
**Response**: Finds Manipal and returns specialties array
**Example**: "Manipal Hospitals offers: Orthopedics, Gastroenterology, Urology"

## Advanced Questions ✅

### 1. Revenue Analysis
**Question**: "What is the revenue per bed for Apollo Hospitals compared to the industry average?"
**Response**: Calculates Apollo's revenue/beds vs industry average
**Example**: "Apollo generates ₹284,615 per bed, which is 156.2% of industry average."

### 2. Regional Analysis
**Question**: "What is the regional occupancy analysis?"
**Response**: Groups hospitals by state and calculates average occupancy
**Example**: "Regional Occupancy: Tamil Nadu: 88.5%, Haryana: 91.2%, Delhi: 90.1%"

### 3. Department Revenue
**Question**: "What percentage of total monthly revenue comes from the top 3 departments?"
**Response**: Sums top 3 departments and calculates percentage
**Example**: "Top 3 departments (Cardiology: 30.1%, Orthopedics: 23.1%, Neurology: 17.9%) contribute 71.1% of total revenue."

## Quick Action Buttons

The chatbot includes quick action buttons for common queries:
- "How many hospitals?" → Total hospital count
- "Apollo rating" → Apollo Hospitals rating
- "Hospital in Chennai" → Chennai hospital search
- "Patient satisfaction" → Current satisfaction score
- "JCI accreditation" → JCI accredited hospitals
- "High priority alerts" → High priority alert check
- "Top 3 department revenue" → Revenue analysis
- "Current occupancy rate" → Today's occupancy

## Emergency Handling 🚨

**Keywords**: emergency, urgent, help, 911, 108, critical, accident
**Response**: Emergency protocol message with contact information

## Data Sources

The chatbot uses the following JSON data files:
- `hospitals.json` - Hospital details, ratings, specialties
- `dashboard_overview.json` - Overall statistics and metrics
- `alerts_notifications.json` - System alerts and notifications
- `department_revenue.json` - Department-wise revenue data

## Implementation Features

✅ **Pattern Matching**: Uses keyword-based matching for user input
✅ **Data Filtering**: Searches and filters JSON data based on criteria
✅ **Mathematical Calculations**: Performs revenue analysis and percentages
✅ **Cross-reference Analysis**: Combines data from multiple sources
✅ **Fallback Responses**: Handles unmatched queries gracefully
✅ **Emergency Priority**: Emergency keywords take highest priority

## Test the Chatbot

You can test any of these questions by:
1. Typing them directly in the chat
2. Using the quick action buttons
3. Variations of the questions (the system is flexible with phrasing)

**Example Variations:**
- "How many hospitals do you have?" ✅
- "Total hospital count?" ✅  
- "Apollo rating please" ✅
- "Tell me about Apollo's rating" ✅
- "Hospitals in Chennai city" ✅
- "Show me Chennai hospitals" ✅
