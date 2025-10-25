export default function PricingPage() {
  const plans = [
    {
      name: 'Starter',
      price: '$9',
      period: '/month',
      credits: '1,000',
      features: [
        '1,000 monthly credits',
        'Basic AI models',
        'Standard resolution',
        'Community support',
        '24h generation queue'
      ]
    },
    {
      name: 'Pro',
      price: '$29',
      period: '/month',
      credits: '5,000',
      popular: true,
      features: [
        '5,000 monthly credits',
        'All AI models',
        'Ultra-HD resolution',
        'Priority support',
        'Fast generation queue',
        'Commercial license'
      ]
    },
    {
      name: 'Enterprise',
      price: '$99',
      period: '/month',
      credits: '25,000',
      features: [
        '25,000 monthly credits',
        'All premium models',
        'Maximum resolution',
        'Dedicated support',
        'Instant generation',
        'Full commercial rights',
        'API access',
        'Custom integration'
      ]
    }
  ];

  return (
    <main style={{ paddingTop: '120px', paddingBottom: '60px' }}>
      <div className="container">
        <div className="text-center mb-5">
          <h1 style={{ fontSize: '2.5rem', color: 'var(--primary-neon)', textShadow: '0 0 30px var(--shadow-cyan)', marginBottom: '20px' }}>
            Choose Your Plan
          </h1>
          <p style={{ fontSize: '1.2rem', color: 'var(--text-light)', maxWidth: '600px', margin: '0 auto' }}>
            Flexible pricing for creators of all sizes
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '30px',
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          {plans.map((plan) => (
            <div
              key={plan.name}
              className="glass-panel hologram"
              style={{
                padding: '40px 30px',
                textAlign: 'center',
                position: 'relative',
                border: plan.popular ? '2px solid var(--primary-neon)' : undefined
              }}
            >
              {plan.popular && (
                <div style={{
                  position: 'absolute',
                  top: '-15px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  background: 'var(--primary-neon)',
                  color: '#000',
                  padding: '5px 20px',
                  borderRadius: '20px',
                  fontWeight: 700,
                  fontSize: '0.9rem'
                }}>
                  MOST POPULAR
                </div>
              )}

              <h3 style={{
                color: 'var(--primary-neon)',
                fontSize: '1.8rem',
                marginBottom: '15px'
              }}>
                {plan.name}
              </h3>

              <div style={{ marginBottom: '20px' }}>
                <span style={{
                  fontSize: '3rem',
                  fontWeight: 'bold',
                  color: 'white'
                }}>
                  {plan.price}
                </span>
                <span style={{
                  fontSize: '1.2rem',
                  color: 'var(--text-light)'
                }}>
                  {plan.period}
                </span>
              </div>

              <div style={{
                padding: '15px',
                background: 'rgba(0, 255, 255, 0.1)',
                borderRadius: '10px',
                marginBottom: '25px'
              }}>
                <div style={{ color: 'var(--primary-neon)', fontWeight: 700, fontSize: '1.1rem' }}>
                  {plan.credits} Credits
                </div>
              </div>

              <ul style={{
                listStyle: 'none',
                padding: 0,
                marginBottom: '30px',
                textAlign: 'left'
              }}>
                {plan.features.map((feature, index) => (
                  <li key={index} style={{
                    color: 'var(--text-light)',
                    marginBottom: '12px',
                    paddingLeft: '25px',
                    position: 'relative'
                  }}>
                    <span style={{
                      position: 'absolute',
                      left: 0,
                      color: 'var(--primary-neon)'
                    }}>✓</span>
                    {feature}
                  </li>
                ))}
              </ul>

              <button
                className="neon-button"
                style={{
                  width: '100%',
                  padding: '15px',
                  fontSize: '1.1rem'
                }}
              >
                Get Started
              </button>
            </div>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="glass-panel" style={{ padding: '40px', marginTop: '60px' }}>
          <h3 style={{ color: 'var(--secondary-neon)', marginBottom: '30px', textAlign: 'center', fontSize: '2rem' }}>
            Frequently Asked Questions
          </h3>
          <div className="grid-2 gap-3">
            <div>
              <h4 style={{ color: 'var(--primary-neon)', marginBottom: '10px' }}>What are credits?</h4>
              <p style={{ color: 'var(--text-light)', lineHeight: '1.6' }}>
                Credits are used to generate images and videos. Different operations cost different amounts of credits based on complexity and quality.
              </p>
            </div>
            <div>
              <h4 style={{ color: 'var(--primary-neon)', marginBottom: '10px' }}>Can I cancel anytime?</h4>
              <p style={{ color: 'var(--text-light)', lineHeight: '1.6' }}>
                Yes! All plans are billed monthly and you can cancel at any time. Your credits remain until the end of your billing period.
              </p>
            </div>
            <div>
              <h4 style={{ color: 'var(--primary-neon)', marginBottom: '10px' }}>Do credits roll over?</h4>
              <p style={{ color: 'var(--text-light)', lineHeight: '1.6' }}>
                Unused credits roll over for one month. After that, they expire to ensure fair usage across all users.
              </p>
            </div>
            <div>
              <h4 style={{ color: 'var(--primary-neon)', marginBottom: '10px' }}>Commercial license?</h4>
              <p style={{ color: 'var(--text-light)', lineHeight: '1.6' }}>
                Pro and Enterprise plans include full commercial rights to use generated content in your business projects.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
