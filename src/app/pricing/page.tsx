import styles from './page.module.css';

const PRICING_PLANS = [
  {
    id: 1,
    name: 'Starter',
    price: 6,
    credits: '600',
    features: [
      'Generate AI Images',
      'Create AI Videos',
      'Upscale Images',
      'Priority Processing',
      'HD Quality Output',
      'No Ads, No Watermarks'
    ]
  },
  {
    id: 2,
    name: 'Pro',
    price: 18,
    credits: '1,900',
    popular: true,
    features: [
      'Generate AI Images',
      'Create AI Videos',
      'Upscale Images',
      'Priority Processing',
      'HD Quality Output',
      'No Ads, No Watermarks'
    ]
  },
  {
    id: 3,
    name: 'Ultimate',
    price: 96,
    credits: '12,000',
    features: [
      'Generate AI Images',
      'Create AI Videos',
      'Upscale Images',
      'Priority Processing',
      'HD Quality Output',
      'No Ads, No Watermarks'
    ]
  }
];

export default function PricingPage() {
  return (
    <div className={styles.pricingPage}>
      <div className={styles.container}>
        <div className="text-center mb-5">
          <h1 style={{ fontSize: '2.5rem', color: 'var(--primary-neon)', textShadow: '0 0 30px var(--shadow-cyan)', marginBottom: '20px' }}>
            Power Up Your Creativity
          </h1>
          <p style={{ fontSize: '1.2rem', color: 'var(--text-light)', maxWidth: '600px', margin: '0 auto' }}>
            One-Time Credit Packs, Unlimited Possibilities
          </p>
        </div>

        <div className={styles.pricingGrid}>
          {PRICING_PLANS.map((plan) => (
            <div 
              key={plan.id} 
              className={`${styles.pricingCard} ${plan.popular ? styles.pricingCardPopular : ''}`}
            >
              {plan.popular && <div className={styles.popularBadge}>POPULAR</div>}
              
              <div className={styles.pricingHeader}>
                <h3 className={styles.pricingTitle}>{plan.name}</h3>
                <div className={styles.pricingPrice}>
                  <span className={styles.currency}>€</span>
                  <span className={styles.amount}>{plan.price}</span>
                </div>
                <div className={styles.pricingCredits}>{plan.credits} Credits</div>
              </div>

              <ul className={styles.pricingFeatures}>
                {plan.features.map((feature, index) => (
                  <li key={index} className={styles.featureItem}>
                    <span className={styles.featureIcon}></span>
                    <span className={styles.featureText}>{feature}</span>
                  </li>
                ))}
              </ul>

              <button className={`${styles.pricingButton} ${plan.popular ? styles.pricingButtonPopular : ''}`}>
                Get Credits
              </button>
            </div>
          ))}
        </div>

        <div className={styles.calculatorSection}>
          <div className="text-center mb-5">
            <h1 style={{ fontSize: '2.5rem', color: 'var(--primary-neon)', textShadow: '0 0 30px var(--shadow-cyan)', marginBottom: '20px' }}>
              Generation Costs Calculator
            </h1>
            <p style={{ fontSize: '1.2rem', color: 'var(--text-light)', maxWidth: '800px', margin: '0 auto' }}>
              See exactly how many generations you can create with each plan based on actual model costs
            </p>
          </div>

          <div className={styles.calculatorPlanSelector}>
            <label htmlFor="plan-select" className={styles.planSelectLabel}>Select Plan:</label>
            <select id="plan-select" className={styles.planSelectDropdown}>
              <option value="starter">Starter</option>
              <option value="pro">Pro</option>
              <option value="ultimate">Ultimate</option>
            </select>
          </div>

          <div className={styles.calculatorCreditsInfo}>
            <p className={styles.creditsInfoText}>Your Starter plan includes 600 credits</p>
          </div>

          <div className={styles.calculatorGrid}>
            <div className={styles.calculatorCard}>
              <h3 className={styles.calculatorCardTitle}>Image Generation</h3>
              <div className={styles.calculatorCardContent}>
                <p>Model costs and generation estimates will be calculated here</p>
              </div>
            </div>

            <div className={styles.calculatorCard}>
              <h3 className={styles.calculatorCardTitle}>Video Generation</h3>
              <div className={styles.calculatorCardContent}>
                <p>Video generation costs and estimates will be shown here</p>
              </div>
            </div>

            <div className={styles.calculatorCard}>
              <h3 className={styles.calculatorCardTitle}>Other Features</h3>
              <div className={styles.calculatorCardContent}>
                <p>Upscaling and other feature costs will appear here</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}