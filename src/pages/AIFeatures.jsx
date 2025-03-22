import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const colors = {
  primary: "#7A9908", // Green
  secondary: "#FFFFFF", // White
  text: "#000000", // Black
};

const AIFeatures = () => {
  const { t } = useTranslation();

  
  const features = [
    {
      id: 'content-creation',
      title: t('contentCreation', 'Content Creation'),
      description: 'Generate engaging content for blogs, articles, and more with our AI-powered content creation tool.',
      imageUrl: 'https://images.unsplash.com/photo-1556740749-887f6717d7e4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1080&q=80',
      path: '/ai-features/content-writting'
    },
    {
      id: 'plagiarism-remover',
      title: t('plagiarismRemover', 'Plagiarism Remover'),
      description: 'Detect and eliminate plagiarism from your documents using our advanced AI tool.',
      imageUrl: 'https://www.apexwritings.com/wp-content/uploads/2019/03/Plagiarism-removal-service-e1607147884440.jpg',
      path: '/ai-features/palgirism-remover'
    },
    {
      id: 'social-media-post',
      title: t('socialMediaPost', 'Social Media Post Content'),
      description: 'Create captivating social media posts that boost engagement with our AI tool.',
      imageUrl: 'https://images.unsplash.com/photo-1588702547923-7093a6c3ba33?ixlib=rb-4.0.3&auto=format&fit=crop&w=1080&q=80',
      path: '/ai-features/social-media-post-generator'
    },
    {
      id: 'grammar-correction',
      title: t('grammarCorrection', 'Grammar Correction'),
      description: 'Enhance your writing by correcting grammar mistakes and improving sentence structure with AI.',
      imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTz-KGZUsrvtCGE_2s8PAjO14SIhr-2rhg9FQ&s',
      path: '/ai-features/grammar-checker'
    }
  ];

  return (
    <div
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24"
      style={{ backgroundColor: colors.secondary, color: colors.text }}
    >
      <div className="text-center mb-16">
        <h1
          className="text-4xl font-bold mb-4"
          style={{ color: colors.primary }}
        >
          {t('aiFeatures', 'AI Content Tools')}
        </h1>
        <p className="text-xl max-w-3xl mx-auto">
          Explore our AI tools designed to boost your creative workflow.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
        {features.map((feature, index) => (
          <motion.div
            key={feature.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Link
              to={feature.path}
              className="block rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border"
              style={{ backgroundColor: colors.secondary, borderColor: colors.primary }}
            >
              <div className="h-48 overflow-hidden">
                <img
                  src={feature.imageUrl}
                  alt={feature.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2" style={{ color: colors.text }}>
                  {feature.title}
                </h3>
                <p style={{ color: colors.text }}>{feature.description}</p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AIFeatures;
