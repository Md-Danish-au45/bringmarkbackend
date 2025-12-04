const mongoose  =  require("mongoose");

const faqSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: true,
      trim: true,
    },
    answer: {
      type: String,
      required: true,
    },

    // Category wise FAQ filtering
    category: {
      type: String,
enum: [
  // Web & App Development
  "web_development",
  "mobile_app_development",
  "frontend_development",
  "backend_development",
  "fullstack_development",
  "ecommerce_development",
  "cms_development",
  "saas_platforms",
  "custom_software",

  // UI/UX & Branding
  "ui_ux_design",
  "branding",
  "prototyping",
  "wireframing",

  // AR / VR Development
  "ar_development",
  "vr_development",
  "metaverse_apps",
  "3d_visualization",

  // IoT Solutions
  "iot_hardware",
  "iot_software",
  "iot_device_integration",
  "smart_home_solutions",
  "industrial_iot",
  "embedded_systems",

  // AI / Machine Learning
  "ai_solutions",
  "ml_models",
  "nlp_chatbots",
  "data_analysis",
  "computer_vision",

  // Cloud Services
  "cloud_architecture",
  "aws_services",
  "google_cloud_services",
  "azure_solutions",
  "serverless_applications",

  // DevOps & Infra
  "devops_automation",
  "ci_cd_pipeline",
  "kubernetes",
  "docker",
  "infrastructure_management",

  // Digital Marketing (Optional but useful)
  "seo",
  "performance_marketing",
  "social_media_management",

  // Miscellaneous
  "general_queries",
  "misc"
],
    },

    // Optional: subcategory
    subCategory: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

module.exports =  mongoose.model("FAQ", faqSchema);
