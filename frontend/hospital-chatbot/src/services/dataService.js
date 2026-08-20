// Advanced Rule-Based Chatbot Service for Hospital Data
class DataService {
  constructor() {
    this.hospitalData = null;
    this.dashboardData = null;
    this.alertsData = null;
    this.departmentData = null;
  }

  // Load all required data
  async loadHospitalData() {
    try {
      // Load multiple data sources
      const [hospitalsResponse, dashboardResponse, alertsResponse, departmentResponse] = await Promise.all([
        fetch('/api/hospitals.json'),
        fetch('/api/dashboard_overview.json'),
        fetch('/api/alerts_notifications.json'),
        fetch('/api/department_revenue.json')
      ]);

      if (!hospitalsResponse.ok) {
        throw new Error('Failed to load hospital data');
      }

      this.hospitalData = await hospitalsResponse.json();
      this.dashboardData = await dashboardResponse.json();
      this.alertsData = await alertsResponse.json();
      this.departmentData = await departmentResponse.json();

      return this.hospitalData;
    } catch (error) {
      console.error('Error loading hospital data:', error);
      return this.getFallbackData();
    }
  }

  // Get hospital information
  getHospitalInfo() {
    return {
      name: "Healing Wave Hospital",
      specialties: ["Emergency Care", "General Medicine", "Surgery"]
    };
  }

  // Main response finder with rule-based logic
  findResponse(userInput) {
    const input = userInput.toLowerCase().trim();
    
    // Emergency keywords (highest priority)
    const emergencyKeywords = ['emergency', 'urgent', 'help', '911', '108', 'critical', 'accident'];
    if (emergencyKeywords.some(keyword => input.includes(keyword))) {
      return this.getEmergencyResponse();
    }

    // Basic Questions
    if (input.includes('how many') && input.includes('hospitals')) {
      return this.getTotalHospitals();
    }

    if (input.includes('apollo') && (input.includes('rating') || input.includes('rate'))) {
      return this.getApolloRating();
    }

    if (input.includes('chennai') || (input.includes('which') && input.includes('hospital') && input.includes('chennai'))) {
      return this.getHospitalInChennai();
    }

    if (input.includes('aiims') && (input.includes('bed') || input.includes('capacity'))) {
      return this.getAIIMSBeds();
    }

    if (input.includes('high priority') && input.includes('alert')) {
      return this.getHighPriorityAlerts();
    }

    if (input.includes('patient satisfaction') || input.includes('satisfaction score')) {
      return this.getPatientSatisfaction();
    }

    if (input.includes('fortis') && input.includes('bed')) {
      return this.getFortisBeds();
    }

    if ((input.includes('today') || input.includes('current')) && input.includes('occupancy')) {
      return this.getCurrentOccupancy();
    }

    if (input.includes('jci') && input.includes('accreditation')) {
      return this.getJCIHospitals();
    }

    if (input.includes('manipal') && input.includes('specialties')) {
      return this.getManipalSpecialties();
    }

    // Advanced Questions
    if (input.includes('revenue per bed') && input.includes('apollo')) {
      return this.getApolloRevenuePerBed();
    }

    if (input.includes('regional') && input.includes('occupancy')) {
      return this.getRegionalOccupancy();
    }

    if (input.includes('top 3') && input.includes('department') && input.includes('revenue')) {
      return this.getTop3DepartmentRevenue();
    }

    // Fallback responses
    return this.getDefaultResponse(input);
  }

  // Basic Question Implementations
  getTotalHospitals() {
    if (!this.dashboardData) return "I'm still loading the data. Please try again.";
    return `There are currently ${this.dashboardData.total_hospitals} hospitals in our network.`;
  }

  getApolloRating() {
    if (!this.hospitalData) return "I'm still loading the hospital data. Please try again.";
    const apollo = this.hospitalData.find(h => h.name.toLowerCase().includes('apollo'));
    if (apollo) {
      return `Apollo Hospitals has a rating of ${apollo.rating} out of 5.0. It's one of our top-rated facilities!`;
    }
    return "I couldn't find Apollo Hospitals in our current data.";
  }

  getHospitalInChennai() {
    if (!this.hospitalData) return "I'm still loading the hospital data. Please try again.";
    const chennaiHospitals = this.hospitalData.filter(h => 
      h.location.toLowerCase().includes('chennai')
    );
    if (chennaiHospitals.length > 0) {
      const names = chennaiHospitals.map(h => h.name).join(', ');
      return `The following hospitals are located in Chennai: ${names}`;
    }
    return "I couldn't find any hospitals specifically located in Chennai in our current data.";
  }

  getAIIMSBeds() {
    if (!this.hospitalData) return "I'm still loading the hospital data. Please try again.";
    const aiims = this.hospitalData.find(h => h.name.toLowerCase().includes('aiims'));
    if (aiims) {
      return `AIIMS Delhi has a bed capacity of ${aiims.beds} beds, making it one of the largest medical facilities in our network.`;
    }
    return "I couldn't find AIIMS Delhi in our current data.";
  }

  getHighPriorityAlerts() {
    if (!this.alertsData) return "I'm still loading the alerts data. Please try again.";
    const highPriorityAlerts = this.alertsData.filter(alert => alert.priority === 'high');
    if (highPriorityAlerts.length > 0) {
      const alertMessages = highPriorityAlerts.map(alert => `${alert.title}: ${alert.message}`).join('\n');
      return `Yes, there are ${highPriorityAlerts.length} high priority alerts:\n${alertMessages}`;
    }
    return "No, there are currently no high priority alerts in the system.";
  }

  getPatientSatisfaction() {
    if (!this.dashboardData) return "I'm still loading the data. Please try again.";
    return `The current patient satisfaction score is ${this.dashboardData.patient_satisfaction} out of 5.0. We're continuously working to improve patient experience.`;
  }

  getFortisBeds() {
    if (!this.hospitalData) return "I'm still loading the hospital data. Please try again.";
    const fortis = this.hospitalData.find(h => h.name.toLowerCase().includes('fortis'));
    if (fortis) {
      return `Fortis Healthcare has ${fortis.beds} beds with an occupancy rate of ${fortis.occupancy_rate}%.`;
    }
    return "I couldn't find Fortis Healthcare in our current data.";
  }

  getCurrentOccupancy() {
    if (!this.dashboardData) return "I'm still loading the data. Please try again.";
    return `Today's average occupancy rate across all hospitals is ${this.dashboardData.avg_occupancy_rate}%.`;
  }

  getJCIHospitals() {
    if (!this.hospitalData) return "I'm still loading the hospital data. Please try again.";
    const jciHospitals = this.hospitalData.filter(h => h.accreditation === 'JCI');
    if (jciHospitals.length > 0) {
      const names = jciHospitals.map(h => h.name).join(', ');
      return `The following hospitals have JCI accreditation: ${names}`;
    }
    return "No hospitals in our current data have JCI accreditation.";
  }

  getManipalSpecialties() {
    if (!this.hospitalData) return "I'm still loading the hospital data. Please try again.";
    const manipal = this.hospitalData.find(h => h.name.toLowerCase().includes('manipal'));
    if (manipal) {
      const specialties = manipal.specialties.join(', ');
      return `Manipal Hospitals offers the following specialties: ${specialties}`;
    }
    return "I couldn't find Manipal Hospitals in our current data.";
  }

  // Advanced Question Implementations
  getApolloRevenuePerBed() {
    if (!this.hospitalData || !this.dashboardData) return "I'm still loading the data. Please try again.";
    
    const apollo = this.hospitalData.find(h => h.name.toLowerCase().includes('apollo'));
    if (!apollo) return "I couldn't find Apollo Hospitals in our current data.";

    // Calculate Apollo's revenue per bed
    const apolloRevenuePerBed = apollo.revenue / apollo.beds;
    
    // Calculate industry average
    const totalRevenue = this.hospitalData.reduce((sum, h) => sum + h.revenue, 0);
    const totalBeds = this.hospitalData.reduce((sum, h) => sum + h.beds, 0);
    const industryAvgRevenuePerBed = totalRevenue / totalBeds;
    
    const percentage = ((apolloRevenuePerBed / industryAvgRevenuePerBed) * 100).toFixed(1);
    
    return `Apollo Hospitals generates ₹${apolloRevenuePerBed.toLocaleString()} per bed, which is ${percentage}% of the industry average (₹${industryAvgRevenuePerBed.toLocaleString()} per bed).`;
  }

  getRegionalOccupancy() {
    if (!this.hospitalData) return "I'm still loading the hospital data. Please try again.";
    
    // Group by state/region
    const regions = {};
    this.hospitalData.forEach(hospital => {
      const state = hospital.location.split(',').pop().trim();
      if (!regions[state]) {
        regions[state] = { totalOccupancy: 0, count: 0 };
      }
      regions[state].totalOccupancy += hospital.occupancy_rate;
      regions[state].count += 1;
    });

    let response = "Regional Occupancy Analysis:\n";
    Object.entries(regions).forEach(([state, data]) => {
      const avgOccupancy = (data.totalOccupancy / data.count).toFixed(1);
      response += `${state}: ${avgOccupancy}% average occupancy\n`;
    });

    return response;
  }

  getTop3DepartmentRevenue() {
    if (!this.departmentData || !this.dashboardData) return "I'm still loading the data. Please try again.";
    
    // Sort departments by revenue and get top 3
    const sortedDepartments = [...this.departmentData]
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, 3);
    
    const top3Revenue = sortedDepartments.reduce((sum, dept) => sum + dept.revenue, 0);
    const totalRevenue = this.dashboardData.monthly_revenue;
    const percentage = ((top3Revenue / totalRevenue) * 100).toFixed(1);
    
    const departmentList = sortedDepartments
      .map(dept => `${dept.department}: ${dept.percentage}%`)
      .join(', ');
    
    return `The top 3 revenue-generating departments (${departmentList}) contribute ${percentage}% of total monthly revenue.`;
  }

  getEmergencyResponse() {
    return "🚨 This is an emergency situation. Please call 108 immediately or go to the nearest Emergency Department. For life-threatening situations, don't wait - seek immediate medical attention!";
  }

  getDefaultResponse(input) {
    const responses = [
      "I can help you with information about hospitals, bed capacity, ratings, specialties, and more. Try asking about specific hospitals or general statistics.",
      "I'm here to help with hospital-related queries. You can ask about ratings, locations, specialties, occupancy rates, and emergency services.",
      "Feel free to ask me about hospital information, patient statistics, department revenues, or emergency services.",
      "I can provide information about our hospital network. Try asking about specific hospitals, their ratings, locations, or services."
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  }

  getFallbackData() {
    return {
      name: "Healing Wave Hospital",
      specialties: ["Emergency Care", "General Medicine", "Surgery"],
      rules: [
        {
          keywords: ["hours", "time", "open", "close"],
          response: "Our hospital is open 24/7 for emergency services. Regular departments operate from 8 AM to 8 PM."
        }
      ]
    };
  }
}

// Create singleton instance
const dataService = new DataService();

export default dataService;
