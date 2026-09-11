/* =============================================
   SAFE2BITE — PASS 1 APPLICATION JAVASCRIPT
   All Screen Definitions + Navigation Logic
   ============================================= */

// ── SCREEN REGISTRY ──────────────────────────
const SCREENS = {};
const INFO = {};

// ─────────────────────────────────────────────
// HELPER: Build mobile status bar HTML
// ─────────────────────────────────────────────
function statusBar(bg = 'transparent') {
  return `
    <div class="mobile-status-bar" style="background:${bg}">
      <span class="status-bar-left">9:41 AM</span>
      <span class="status-bar-right">
        <span class="status-icon">●●●●</span>
        <span class="status-icon">WiFi</span>
        <span class="status-icon">🔋</span>
      </span>
    </div>`;
}

// ─────────────────────────────────────────────
// HELPER: Patient bottom navigation
// ─────────────────────────────────────────────
function patientNav(active = 'today') {
  const items = [
    { id: 'today',     iconName: 'today',     label: 'Today',     screen: 'patient-today' },
    { id: 'treatment', iconName: 'treatment', label: 'Treatment', screen: 'patient-treatment' },
    { id: 'progress',  iconName: 'progress',  label: 'Progress',  screen: 'patient-progress' },
    { id: 'care',      iconName: 'care',      label: 'Care',      screen: 'patient-care' },
    { id: 'profile',   iconName: 'profile',   label: 'Profile',   screen: 'patient-profile' },
  ];
  return `<nav class="mobile-bottom-nav" role="navigation" aria-label="Main Navigation">
    ${items.map(i => `
      <div class="bottom-nav-item ${i.id === active ? 'active' : ''}" onclick="showScreen('${i.screen}')" role="button" aria-label="${i.label}">
        <div class="bottom-nav-icon">${icon(i.iconName, 22)}</div>
        <div class="bottom-nav-label">${i.label}</div>
        ${i.id === active ? '<div class="bottom-nav-dot"></div>' : ''}
      </div>`).join('')}
  </nav>`;
}

// ─────────────────────────────────────────────
// HELPER: Doctor bottom navigation
// ─────────────────────────────────────────────
function doctorNav(active = 'dashboard') {
  const items = [
    { id: 'dashboard', iconName: 'dashboard', label: 'Dashboard', screen: 'doctor-dashboard' },
    { id: 'patients',  iconName: 'patients',  label: 'Patients',  screen: 'doctor-patients' },
    { id: 'alerts',    iconName: 'alerts',    label: 'Alerts',    screen: 'doctor-alerts' },
    { id: 'messages',  iconName: 'messages',  label: 'Messages',  screen: 'doctor-messages' },
    { id: 'more',      iconName: 'more',      label: 'More',      screen: 'doctor-dashboard' },
  ];
  return `<nav class="mobile-bottom-nav" role="navigation" aria-label="Doctor Navigation">
    ${items.map(i => `
      <div class="bottom-nav-item ${i.id === active ? 'active' : ''}" onclick="showScreen('${i.screen}')" role="button" aria-label="${i.label}">
        <div class="bottom-nav-icon">${icon(i.iconName, 22)}</div>
        <div class="bottom-nav-label">${i.label}</div>
        ${i.id === active ? '<div class="bottom-nav-dot"></div>' : ''}
      </div>`).join('')}
  </nav>`;
}

// ─────────────────────────────────────────────
// SCREEN: SPLASH
// ─────────────────────────────────────────────
SCREENS['splash'] = () => `
  <div class="screen-full" style="background: linear-gradient(180deg, var(--s2b-teal-light) 0%, #fff 60%); min-height: 780px; display:flex; flex-direction:column; align-items:center; justify-content:center; padding:40px 32px;">
    ${statusBar('transparent')}
    <div style="flex:1; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:0; width:100%;">
      <div style="margin-bottom:36px; display:flex; justify-content:center;">
        <img
          src="https://arokiaitusa.com/wp-content/uploads/2026/09/Safe2Bite-Logo-blue-teal-300x108-1.png"
          alt="Safe2Bite — Texas Food Allergy Care"
          style="width:220px; height:auto; display:block;"
        />
      </div>
      <div style="font-size:15px; color:var(--text-secondary); text-align:center; line-height:1.6; margin-bottom:48px; font-style:italic;">"Because Every Bite Should Feel Safe"</div>
      <div style="width:40px; height:4px; border-radius:999px; background:var(--s2b-teal); opacity:0.4; margin-bottom:4px;"></div>
      <div style="width:24px; height:4px; border-radius:999px; background:var(--s2b-teal); opacity:0.2;"></div>
    </div>
    <div style="width:100%; display:flex; flex-direction:column; gap:12px; padding-bottom:40px;">
      <button class="btn btn-primary" onclick="showScreen('onboarding-1')">Get Started</button>
      <button class="btn btn-secondary" onclick="showScreen('login')">I Already Have an Account</button>
    </div>
  </div>`;

INFO['splash'] = {
  screen: 'Splash Screen',
  role: 'system',
  desc: 'The first screen users see when launching Safe2Bite. Establishes brand identity, core tagline, and entry paths for new vs. returning users.',
  ia: [
    { title: 'Brand Presentation', body: 'Logo, wordmark, tagline, and brand colors' },
    { title: 'Get Started', body: 'Leads new users into onboarding flow' },
    { title: 'Already Have Account', body: 'Leads returning users to login' },
  ],
  notes: 'Clean, minimal, reassuring. No medical content on this screen. White/teal gradient background.'
};

// ─────────────────────────────────────────────
// SCREEN: ONBOARDING 1
// ─────────────────────────────────────────────
SCREENS['onboarding-1'] = () => `
  <div class="screen-full" style="min-height:780px; background:#fff;">
    ${statusBar('#fff')}
    <div style="display:flex; flex-direction:column; height:calc(780px - 44px);">
      <div style="flex:1; display:flex; flex-direction:column; align-items:center; padding:24px 32px 0;">
        <div style="margin:24px 0; width:100%; height:200px; background:linear-gradient(135deg,var(--s2b-teal-light),var(--s2b-blue-light)); border-radius:var(--radius-2xl); display:flex; align-items:center; justify-content:center; position:relative; overflow:hidden;">
          <svg viewBox="0 0 200 160" width="200" height="160" fill="none" aria-hidden="true">
            <!-- Connection line -->
            <line x1="60" y1="80" x2="140" y2="80" stroke="var(--s2b-teal)" stroke-width="2" stroke-dasharray="6 4" opacity="0.5"/>
            <!-- Patient figure -->
            <circle cx="52" cy="58" r="18" fill="var(--s2b-blue-light)" stroke="var(--s2b-blue)" stroke-width="2"/>
            <circle cx="52" cy="52" r="8" fill="var(--s2b-blue)" opacity="0.6"/>
            <path d="M34 75c0-10 8-16 18-16s18 6 18 16" fill="var(--s2b-blue)" opacity="0.35"/>
            <!-- Heart pulse line -->
            <polyline points="72,80 84,80 88,68 94,94 98,74 104,80 128,80" stroke="var(--s2b-teal)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
            <!-- Doctor figure -->
            <circle cx="148" cy="58" r="18" fill="var(--s2b-teal-light)" stroke="var(--s2b-teal)" stroke-width="2"/>
            <circle cx="148" cy="52" r="8" fill="var(--s2b-teal)" opacity="0.6"/>
            <path d="M130 75c0-10 8-16 18-16s18 6 18 16" fill="var(--s2b-teal)" opacity="0.35"/>
            <!-- Medical cross badge -->
            <rect x="140" y="34" width="16" height="16" rx="3" fill="white" stroke="var(--s2b-teal)" stroke-width="1.5"/>
            <line x1="148" y1="37" x2="148" y2="47" stroke="var(--s2b-teal)" stroke-width="2" stroke-linecap="round"/>
            <line x1="143" y1="42" x2="153" y2="42" stroke="var(--s2b-teal)" stroke-width="2" stroke-linecap="round"/>
            <!-- Shield check -->
            <path d="M95 108L85 112v8c0 7 4.5 13.5 10 15.5 5.5-2 10-8.5 10-15.5v-8L95 108z" fill="var(--s2b-blue-light)" stroke="var(--s2b-blue)" stroke-width="1.5"/>
            <polyline points="90 120 93.5 123.5 100.5 116" stroke="var(--s2b-blue)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <div class="onboarding-dots">
          <div class="onboarding-dot active"></div>
          <div class="onboarding-dot"></div>
          <div class="onboarding-dot"></div>
        </div>
        <div style="font-size:24px; font-weight:800; color:var(--s2b-blue); text-align:center; line-height:1.3; margin-bottom:12px;">Your Allergy Care,<br>Wherever You Are</div>
        <div style="font-size:14px; color:var(--text-secondary); text-align:center; line-height:1.65; max-width:280px;">Stay connected with your Safe2Bite care team between appointments.</div>
      </div>
      <div style="padding:24px 32px 40px; display:flex; flex-direction:column; gap:12px;">
        <button class="btn btn-primary" onclick="showScreen('onboarding-2')">Next →</button>
        <button class="btn btn-text" onclick="showScreen('login')" style="color:var(--text-secondary);">Skip</button>
      </div>
    </div>
  </div>`;

INFO['onboarding-1'] = {
  screen: 'Onboarding — Screen 1 of 3',
  role: 'system',
  desc: 'First onboarding screen. Introduces the app concept: continuous care connection between visits.',
  ia: [
    { title: 'Illustration Area', body: 'Visual metaphor for remote care and connection' },
    { title: 'Step Indicator', body: '3-dot progress dots, first active' },
    { title: 'Headline', body: '"Your Allergy Care, Wherever You Are"' },
    { title: 'Next Button', body: 'Advances to Onboarding 2' },
    { title: 'Skip', body: 'Goes directly to Login' },
  ]
};

// ─────────────────────────────────────────────
// SCREEN: ONBOARDING 2
// ─────────────────────────────────────────────
SCREENS['onboarding-2'] = () => `
  <div class="screen-full" style="min-height:780px; background:#fff;">
    ${statusBar('#fff')}
    <div style="display:flex; flex-direction:column; height:calc(780px - 44px);">
      <div style="flex:1; display:flex; flex-direction:column; align-items:center; padding:24px 32px 0;">
        <div style="margin:24px 0; width:100%; height:200px; background:linear-gradient(135deg,var(--s2b-blue-light),var(--s2b-teal-light)); border-radius:var(--radius-2xl); display:flex; align-items:center; justify-content:center;">
          <svg viewBox="0 0 200 160" width="200" height="160" fill="none" aria-hidden="true">
            <!-- Calendar card -->
            <rect x="30" y="28" width="80" height="84" rx="10" fill="white" stroke="var(--s2b-blue)" stroke-width="2"/>
            <rect x="30" y="28" width="80" height="24" rx="10" fill="var(--s2b-blue)"/>
            <rect x="30" y="40" width="80" height="12" fill="var(--s2b-blue)"/>
            <line x1="54" y1="22" x2="54" y2="34" stroke="var(--s2b-blue)" stroke-width="2.5" stroke-linecap="round"/>
            <line x1="86" y1="22" x2="86" y2="34" stroke="var(--s2b-blue)" stroke-width="2.5" stroke-linecap="round"/>
            <!-- Calendar dots -->
            <circle cx="50" cy="68" r="4" fill="var(--s2b-teal)"/>
            <circle cx="70" cy="68" r="4" fill="var(--s2b-teal)"/>
            <circle cx="90" cy="68" r="4" fill="var(--border-light)" stroke="var(--border-light)"/>
            <circle cx="50" cy="85" r="4" fill="var(--border-light)"/>
            <circle cx="70" cy="85" r="4" fill="var(--s2b-blue)" opacity="0.4"/>
            <circle cx="90" cy="85" r="4" fill="var(--border-light)"/>
            <!-- Pill capsule -->
            <path d="M118 72 a18 18 0 0 1 0-36" fill="var(--s2b-teal)" opacity="0.85"/>
            <path d="M118 72 a18 18 0 0 0 0-36" fill="var(--s2b-blue)" opacity="0.7"/>
            <line x1="118" y1="36" x2="118" y2="72" stroke="white" stroke-width="1.5"/>
            <!-- Check circle -->
            <circle cx="152" cy="100" r="22" fill="var(--s2b-teal-light)" stroke="var(--s2b-teal)" stroke-width="2"/>
            <path d="M142 100 l7 7 13-14" stroke="var(--s2b-teal)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <div class="onboarding-dots">
          <div class="onboarding-dot"></div>
          <div class="onboarding-dot active"></div>
          <div class="onboarding-dot"></div>
        </div>
        <div style="font-size:24px; font-weight:800; color:var(--s2b-blue); text-align:center; line-height:1.3; margin-bottom:12px;">Stay on Track With<br>Your Treatment</div>
        <div style="font-size:14px; color:var(--text-secondary); text-align:center; line-height:1.65; max-width:280px;">View your daily dose, upcoming doses, reminders and treatment progress all in one place.</div>
      </div>
      <div style="padding:24px 32px 40px; display:flex; flex-direction:column; gap:12px;">
        <button class="btn btn-primary" onclick="showScreen('onboarding-3')">Next →</button>
        <button class="btn btn-text" onclick="showScreen('login')" style="color:var(--text-secondary);">Skip</button>
      </div>
    </div>
  </div>`;

INFO['onboarding-2'] = {
  screen: 'Onboarding — Screen 2 of 3',
  role: 'system',
  desc: 'Second onboarding screen. Focuses on treatment plan adherence, dose tracking, and reminders.',
  ia: [
    { title: 'Illustration', body: 'Visual of dose/treatment tracking UI' },
    { title: 'Step Indicator', body: 'Second dot active' },
    { title: 'Headline', body: '"Stay on Track With Your Treatment"' },
  ]
};

// ─────────────────────────────────────────────
// SCREEN: ONBOARDING 3
// ─────────────────────────────────────────────
SCREENS['onboarding-3'] = () => `
  <div class="screen-full" style="min-height:780px; background:#fff;">
    ${statusBar('#fff')}
    <div style="display:flex; flex-direction:column; height:calc(780px - 44px);">
      <div style="flex:1; display:flex; flex-direction:column; align-items:center; padding:24px 32px 0;">
        <div style="margin:24px 0; width:100%; height:200px; background:linear-gradient(135deg,var(--s2b-teal-light),#f0f9ff); border-radius:var(--radius-2xl); display:flex; align-items:center; justify-content:center;">
          <svg viewBox="0 0 200 160" width="200" height="160" fill="none" aria-hidden="true">
            <!-- Doctor bubble -->
            <rect x="20" y="25" width="110" height="60" rx="14" fill="var(--s2b-blue)" opacity="0.9"/>
            <path d="M38 85 L30 100 L55 85" fill="var(--s2b-blue)" opacity="0.9"/>
            <!-- Message lines in doctor bubble -->
            <line x1="34" y1="45" x2="116" y2="45" stroke="white" stroke-width="2.5" stroke-linecap="round" opacity="0.9"/>
            <line x1="34" y1="58" x2="96" y2="58" stroke="white" stroke-width="2.5" stroke-linecap="round" opacity="0.6"/>
            <line x1="34" y1="71" x2="80" y2="71" stroke="white" stroke-width="2.5" stroke-linecap="round" opacity="0.4"/>
            <!-- Patient reply bubble -->
            <rect x="70" y="95" width="110" height="48" rx="14" fill="var(--s2b-teal-light)" stroke="var(--s2b-teal)" stroke-width="1.5"/>
            <path d="M162 143 L170 158 L145 143" fill="var(--s2b-teal-light)" stroke="var(--s2b-teal)" stroke-width="1.5"/>
            <line x1="84" y1="113" x2="166" y2="113" stroke="var(--s2b-teal)" stroke-width="2" stroke-linecap="round" opacity="0.7"/>
            <line x1="84" y1="127" x2="140" y2="127" stroke="var(--s2b-teal)" stroke-width="2" stroke-linecap="round" opacity="0.4"/>
            <!-- Shield check overlay -->
            <circle cx="168" cy="42" r="18" fill="white" stroke="var(--s2b-teal)" stroke-width="1.5"/>
            <path d="M168 28 l-9 4v5.5c0 5.5 3.5 9.5 9 10.5 5.5-1 9-5 9-10.5V32L168 28z" fill="var(--s2b-teal-light)" stroke="var(--s2b-teal)" stroke-width="1.5"/>
            <polyline points="163 41 165.5 43.5 173 36.5" stroke="var(--s2b-teal)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <div class="onboarding-dots">
          <div class="onboarding-dot"></div>
          <div class="onboarding-dot"></div>
          <div class="onboarding-dot active"></div>
        </div>
        <div style="font-size:24px; font-weight:800; color:var(--s2b-blue); text-align:center; line-height:1.3; margin-bottom:12px;">Stay Connected With<br>Your Care Team</div>
        <div style="font-size:14px; color:var(--text-secondary); text-align:center; line-height:1.65; max-width:280px;">Complete assessments, report symptoms and communicate with your Safe2Bite team.</div>
      </div>
      <div style="padding:24px 32px 40px; display:flex; flex-direction:column; gap:12px;">
        <button class="btn btn-primary" onclick="showScreen('role-select')">Get Started</button>
      </div>
    </div>
  </div>`;

INFO['onboarding-3'] = {
  screen: 'Onboarding — Screen 3 of 3',
  role: 'system',
  desc: 'Final onboarding screen. Highlights care team communication features.',
  ia: [
    { title: 'Get Started', body: 'Leads to Login/Sign Up screen' },
  ]
};

// ─────────────────────────────────────────────
// SCREEN: LOGIN
// ─────────────────────────────────────────────
SCREENS['login'] = () => `
  <div class="screen-full" style="min-height:780px; background:#fff;">
    ${statusBar('#fff')}
    <div style="padding:20px 28px 40px; display:flex; flex-direction:column; min-height:calc(780px - 44px);">
      <div style="flex:1;">
        <div style="margin-bottom:32px; text-align:center; padding-top:16px;">
          <div style="width:52px; height:52px; background:var(--s2b-teal-light); border-radius:14px; display:flex; align-items:center; justify-content:center; margin:0 auto 12px;">${icon('shield-check', 28, 'var(--s2b-teal)')}</div>
          <div style="font-size:26px; font-weight:800; color:var(--s2b-blue);">Welcome</div>
          <div style="font-size:13px; color:var(--text-secondary); margin-top:4px;">Sign in to your Safe2Bite account</div>
        </div>
        <div class="input-group">
          <label class="input-label" for="email-input">Email Address</label>
          <input id="email-input" class="input-field" type="email" placeholder="your@email.com" aria-label="Email Address" />
        </div>
        <div class="input-group">
          <label class="input-label" for="password-input">Password</label>
          <input id="password-input" class="input-field" type="password" placeholder="••••••••" aria-label="Password" />
        </div>
        <div style="text-align:right; margin-bottom:24px;">
          <span onclick="showScreen('forgot-password')" style="font-size:13px; color:var(--s2b-teal); font-weight:600; cursor:pointer;">Forgot Password?</span>
        </div>
        <button class="btn btn-primary" onclick="showScreen('patient-today')" id="login-btn">Log In</button>
        <div style="display:flex; align-items:center; gap:12px; margin:20px 0;">
          <div style="flex:1; height:1px; background:var(--border-light);"></div>
          <span style="font-size:12px; color:var(--text-muted);">or</span>
          <div style="flex:1; height:1px; background:var(--border-light);"></div>
        </div>
        <button class="btn btn-secondary" style="width:100%; margin-bottom:12px; display:flex; align-items:center; justify-content:center; gap:8px;" id="biometric-btn">
          ${icon('lock', 18, 'var(--s2b-blue)')} Use Biometrics
        </button>
      </div>
      <div style="text-align:center; padding-top:16px;">
        <span style="font-size:13px; color:var(--text-secondary);">New to Safe2Bite? </span>
        <span onclick="showScreen('create-account')" style="font-size:13px; color:var(--s2b-teal); font-weight:600; cursor:pointer;">Create Account</span>
      </div>
    </div>
  </div>`;

INFO['login'] = {
  screen: 'Login',
  role: 'system',
  desc: 'Returning user login. "Log In" goes directly to Today Dashboard. Forgot Password launches recovery flow. Create Account links to Pass 2 registration.',
  ia: [
    { title: 'Email Field', body: 'Primary identifier' },
    { title: 'Password Field', body: 'Secure entry' },
    { title: 'Forgot Password?', body: 'Leads to forgot-password screen' },
    { title: 'Log In', body: 'Authenticates → Today Dashboard' },
    { title: 'Biometrics', body: 'Face ID / Touch ID for returning users' },
    { title: 'Create Account', body: 'Leads to create-account (Pass 2)' },
  ]
};

// ─────────────────────────────────────────────
// SCREEN: ROLE SELECTION
// ─────────────────────────────────────────────
SCREENS['role-select'] = () => `
  <div class="screen-full" style="min-height:780px; background:var(--surface-base);">
    ${statusBar('var(--surface-base)')}
    <div style="padding:20px 24px 40px;">
      <div style="margin-bottom:28px;">
        <div style="font-size:22px; font-weight:800; color:var(--s2b-blue); margin-bottom:8px;">Who Are You?</div>
        <div style="font-size:14px; color:var(--text-secondary);">Select your role to personalize your Safe2Bite experience.</div>
      </div>
      
      <div style="display:flex; flex-direction:column; gap:14px;">
        <!-- Patient -->
        <div onclick="showScreen('create-account')" style="background:white; border-radius:var(--radius-xl); border:2px solid var(--border-light); padding:20px; cursor:pointer; transition:border-color 0.2s, box-shadow 0.2s; display:flex; align-items:center; gap:16px;" id="role-patient" onmouseover="this.style.borderColor='#1b3863'; this.style.boxShadow='0 4px 16px rgba(27,56,99,0.10)'" onmouseout="this.style.borderColor='var(--border-light)'; this.style.boxShadow='none'">
          <div style="width:52px; height:52px; background:var(--s2b-blue-light); border-radius:var(--radius-lg); display:flex; align-items:center; justify-content:center; flex-shrink:0;">${icon('role-patient', 26, 'var(--s2b-blue)')}</div>
          <div style="flex:1;">
            <div style="font-size:16px; font-weight:700; color:var(--s2b-blue); margin-bottom:4px;">I'm a Patient</div>
            <div style="font-size:12px; color:var(--text-secondary); line-height:1.5;">Track my treatment, doses, and stay connected with my care team.</div>
          </div>
          <div style="color:var(--text-muted); display:flex; align-items:center;">${icon('chevron', 18, 'var(--text-muted)', 2)}</div>
        </div>
        
        <!-- Caregiver -->
        <div onclick="showScreen('caregiver-intro')" style="background:white; border-radius:var(--radius-xl); border:2px solid var(--border-light); padding:20px; cursor:pointer; transition:border-color 0.2s, box-shadow 0.2s; display:flex; align-items:center; gap:16px;" id="role-caregiver" onmouseover="this.style.borderColor='#5b21b6'; this.style.boxShadow='0 4px 16px rgba(91,33,182,0.10)'" onmouseout="this.style.borderColor='var(--border-light)'; this.style.boxShadow='none'">
          <div style="width:52px; height:52px; background:#f0edff; border-radius:var(--radius-lg); display:flex; align-items:center; justify-content:center; flex-shrink:0;">${icon('role-caregiver', 26, '#5b21b6')}</div>
          <div style="flex:1;">
            <div style="font-size:16px; font-weight:700; color:#5b21b6; margin-bottom:4px;">I'm a Caregiver</div>
            <div style="font-size:12px; color:var(--text-secondary); line-height:1.5;">Manage care for a child or family member enrolled in treatment.</div>
          </div>
          <div style="color:var(--text-muted); display:flex; align-items:center;">${icon('chevron', 18, 'var(--text-muted)', 2)}</div>
        </div>
        
        <!-- Doctor/Care Team -->
        <div onclick="showScreen('doctor-dashboard')" style="background:white; border-radius:var(--radius-xl); border:2px solid var(--border-light); padding:20px; cursor:pointer; transition:border-color 0.2s, box-shadow 0.2s; display:flex; align-items:center; gap:16px;" id="role-doctor" onmouseover="this.style.borderColor='#065f46'; this.style.boxShadow='0 4px 16px rgba(6,95,70,0.10)'" onmouseout="this.style.borderColor='var(--border-light)'; this.style.boxShadow='none'">
          <div style="width:52px; height:52px; background:#e6f7f0; border-radius:var(--radius-lg); display:flex; align-items:center; justify-content:center; flex-shrink:0;">${icon('role-doctor', 26, '#065f46')}</div>
          <div style="flex:1;">
            <div style="font-size:16px; font-weight:700; color:#065f46; margin-bottom:4px;">Doctor / Care Team</div>
            <div style="font-size:12px; color:var(--text-secondary); line-height:1.5;">Access patient information, alerts, and clinical tools.</div>
          </div>
          <div style="color:var(--text-muted); display:flex; align-items:center;">${icon('chevron', 18, 'var(--text-muted)', 2)}</div>
        </div>
      </div>
      
      <div style="margin-top:24px; padding:14px; background:var(--s2b-teal-light); border-radius:var(--radius-lg); border:1px solid var(--s2b-teal-mid); display:flex; align-items:flex-start; gap:10px;">
        <div style="flex-shrink:0; margin-top:1px;">${icon('shield-check', 16, 'var(--s2b-teal)')}</div>
        <div style="font-size:12px; color:var(--s2b-teal-dark); line-height:1.6;">
          <strong>Secure Access</strong><br>
          Your role determines what information you can view and actions you can take. Role-based access is enforced by the Safe2Bite system.
        </div>
      </div>
    </div>
  </div>`;

INFO['role-select'] = {
  screen: 'Role Selection',
  role: 'system',
  desc: 'Post-login role selection. In a production system, role may be pre-assigned and this screen would be skipped or shown as a switcher for multi-role users.',
  ia: [
    { title: 'Patient', body: 'Leads to Patient Today dashboard' },
    { title: 'Caregiver', body: 'Leads to My Patients / My Family screen' },
    { title: 'Doctor/Care Team', body: 'Leads to Doctor Dashboard' },
  ],
  notes: 'In production, the backend assigns roles. This selection screen may be shown only to users with multiple authorized roles.'
};

// ─────────────────────────────────────────────
// PASS 3 HELPERS — TODAY DASHBOARD
// ─────────────────────────────────────────────

// Dynamic greeting based on time of day
function greeting() {
  const h = new Date().getHours();
  if (h < 12) return 'Good morning';
  if (h < 17) return 'Good afternoon';
  return 'Good evening';
}

// SVG ring progress indicator for daily status strip
// filled = 0–100 percentage, ringClass = CSS modifier
function statusRing(filled = 75, done = 3, total = 4, ringClass = 'ring-on-track') {
  const r = 17; const circ = 2 * Math.PI * r;
  const offset = circ - (filled / 100) * circ;
  return `
    <div class="daily-status-strip ${ringClass}">
      <div class="daily-status-ring-wrap">
        <svg class="daily-status-ring-svg" width="44" height="44" viewBox="0 0 44 44">
          <circle class="daily-status-ring-track" cx="22" cy="22" r="${r}"/>
          <circle class="daily-status-ring-fill" cx="22" cy="22" r="${r}"
            stroke-dasharray="${circ.toFixed(1)}"
            stroke-dashoffset="${offset.toFixed(1)}"/>
        </svg>
        <div class="daily-status-ring-center">${done}/${total}</div>
      </div>
      <div>
        <div class="daily-status-label">${ringClass === 'ring-complete' ? 'All done today!' : ringClass === 'ring-critical' ? 'Action Required' : ringClass === 'ring-action' ? 'Needs Attention' : 'On Track'}</div>
        <div class="daily-status-sub">${done} of ${total} tasks complete</div>
      </div>
      <div class="daily-status-badge-wrap">
        <span class="status-badge ${ringClass === 'ring-complete' ? 'completed' : ringClass === 'ring-critical' ? 'urgent' : ringClass === 'ring-action' ? 'warning' : ringClass === 'ring-attention' ? 'attention' : 'completed'}">${ringClass === 'ring-complete' ? '● Complete' : ringClass === 'ring-critical' ? '● Action Required' : ringClass === 'ring-action' ? '● Needs Attention' : ringClass === 'ring-attention' ? '● Attention' : '● On Track'}</span>
      </div>
    </div>`;
}

// Reusable dose card builder for different states
function todayDoseCard(state = 'upcoming', doseAmt = '5 mg', time = '8:00', period = 'AM', desc = 'Take with food after breakfast', btn1Label = 'Confirm Dose', btn1Id = 'dose-confirm-btn', btn2Label = 'I Did Not Take It', btn2Id = 'dose-missed-btn', btn2Screen = 'today-state-e') {
  const stateMap = {
    'upcoming':     { stateLabel: 'Scheduled',   icon: 'clock',    btn1Class: 'primary', btn2: true },
    'due-now':      { stateLabel: 'Due Now',      icon: 'clock',    btn1Class: 'primary', btn2: true },
    'completed':    { stateLabel: 'Completed',    icon: 'check-circle-filled', btn1Class: 'single',  btn2: false },
    'missed':       { stateLabel: 'Missed',       icon: 'emergency', btn1Class: 'primary', btn2: false },
    'needs-review': { stateLabel: 'Needs Review', icon: 'alerts',   btn1Class: 'primary', btn2: false },
  };
  const s = stateMap[state] || stateMap['upcoming'];
  return `
    <div class="dose-card state-${state}">
      <div class="dose-card-label" style="opacity:0.7; font-size:10px; letter-spacing:0.1em; text-transform:uppercase; margin-bottom:6px;">TODAY'S DOSE</div>
      <div class="dose-state-label">${icon(s.icon, 12, 'white', 2)} ${s.stateLabel}</div>
      <div class="dose-time-display">
        <span class="dose-time-value">${time}</span>
        <span class="dose-time-period">${period}</span>
      </div>
      <div style="font-size:22px; font-weight:800; color:white; letter-spacing:-0.02em; margin-bottom:4px;">${doseAmt}</div>
      <div class="dose-card-desc">${desc}</div>
      <div class="dose-card-btn-row">
        <button class="dose-btn ${s.btn1Class}" id="${btn1Id}" onclick="showScreen('patient-treatment')">${icon('treatment', 14, 'white', 2)} ${btn1Label}</button>
        ${s.btn2 ? `<button class="dose-btn secondary" id="${btn2Id}" onclick="showScreen('${btn2Screen}')">${btn2Label}</button>` : ''}
      </div>
    </div>`;
}

// Reusable task list card builder
function todayTasksCard(tasks) {
  // tasks = array of { iconName, iconClass, title, sub, status, screen }
  // status: 'done' | 'due-now' | 'due' | 'pending' | 'missed' | 'skipped'
  const statusChip = { done: 'Done', 'due-now': 'Due Now', due: 'Scheduled', pending: 'Not Started', missed: 'Missed', skipped: 'Skipped' };
  const checkState = { done: 'done', 'due-now': 'due', due: 'due', pending: '', missed: 'missed', skipped: '' };
  return `
    <div class="card" style="padding:0; overflow:hidden; border-radius:var(--radius-xl);">
      ${tasks.map(t => `
        <div class="task-row ${t.status === 'done' ? 'done' : ''}" onclick="showScreen('${t.screen}')">
          <div class="task-icon-cell ${t.iconClass}">${icon(t.iconName, 20, t.status === 'done' ? 'var(--s2b-success)' : t.status === 'missed' ? 'var(--s2b-urgent)' : t.status === 'due-now' ? 'var(--s2b-teal)' : 'var(--s2b-blue)', 1.75)}</div>
          <div class="task-row-body">
            <div class="task-row-title ${t.status === 'done' ? 'strikethrough' : ''}">${t.title}</div>
            <div class="task-row-sub">${t.sub}</div>
          </div>
          <div class="task-check-icon ${checkState[t.status]}">
            ${t.status === 'done' ? icon('check-circle-filled', 14, 'white', 2.5) : t.status === 'missed' ? icon('x', 12, 'white', 2.5) : ''}
          </div>
          <span class="task-status-chip ${t.status}">${statusChip[t.status]}</span>
        </div>`).join('')}
    </div>`;
}

// Reusable health assessment card
function healthCard(state = 'not-started', screen = 'today-assessment-placeholder') {
  const stateMap = {
    'not-started': { title: 'Daily Health Check', sub: 'Tell us how you\'re feeling before continuing your care plan today.', btnLabel: 'Start Assessment', btnClass: '' },
    'completed':   { title: 'Health Check Complete', sub: 'Completed at 8:14 AM — no concerns reported.', btnLabel: 'View Assessment', btnClass: 'completed-state' },
    'attention':   { title: 'Health Check Flagged', sub: 'Your response needs a review from your care team.', btnLabel: 'View Details', btnClass: '' },
  };
  const s = stateMap[state] || stateMap['not-started'];
  const iconColor = state === 'completed' ? 'var(--s2b-success)' : state === 'attention' ? 'var(--s2b-attention)' : 'var(--s2b-blue)';
  return `
    <div class="health-card">
      <div class="health-card-icon ${state}">${icon('heart-pulse', 26, iconColor, 1.75)}</div>
      <div class="health-card-body">
        <div class="health-card-title">${s.title}</div>
        <div class="health-card-sub">${s.sub}</div>
      </div>
      <button class="health-card-action ${s.btnClass}" onclick="showScreen('${screen}')">${s.btnLabel}</button>
    </div>`;
}

// Reusable treatment progress compact card
function todayProgressCard(phase = 'Phase 2', week = 'Week 6', title = 'Dose Buildup', pct = 62) {
  const circ = 2 * Math.PI * 18;
  const offset = circ - (pct / 100) * circ;
  return `
    <div class="progress-compact">
      <div class="progress-compact-top">
        <div>
          <div class="progress-compact-phase">${phase} · ${week}</div>
          <div class="progress-compact-title">${title}</div>
        </div>
        <div class="progress-pct-circle">
          <svg class="progress-pct-svg" width="48" height="48" viewBox="0 0 48 48">
            <circle class="progress-pct-bg" cx="24" cy="24" r="18"/>
            <circle class="progress-pct-fg" cx="24" cy="24" r="18"
              stroke-dasharray="${circ.toFixed(1)}" stroke-dashoffset="${offset.toFixed(1)}"/>
          </svg>
          <div class="progress-pct-num">${pct}%</div>
        </div>
      </div>
      <div class="progress-bar-wrap">
        <div class="progress-bar-fill" style="width:${pct}%;"></div>
      </div>
      <div class="progress-bar-label-row">
        <span>Started Aug 1, 2026</span>
        <span>${pct}% toward goal dose</span>
      </div>
    </div>`;
}

// Reusable care team compact card
function todayCareCard(status = 'available') {
  const statusMap = {
    'available':   { label: 'Available for messages', cls: 'available', dot: '●' },
    'responding':  { label: 'Message received, responding', cls: 'responding', dot: '●' },
    'new-message': { label: 'New message from care team', cls: 'new-message', dot: '●' },
  };
  const s = statusMap[status] || statusMap['available'];
  return `
    <div class="care-team-compact">
      <div class="care-team-avatar">Dr</div>
      <div class="care-team-body">
        <div class="care-team-name">Dr. Sarah Mitchell</div>
        <div class="care-team-role">Allergist · Texas Allergy MD</div>
        <div class="care-team-status ${s.cls}">${s.dot} ${s.label}</div>
      </div>
      <button class="care-msg-btn" id="care-msg-btn" onclick="showScreen('patient-care')">${icon('send', 13, 'var(--s2b-teal-dark)', 1.75)} Message</button>
    </div>`;
}

// Reusable upcoming schedule card
function todayUpcomingCard(entries = []) {
  if (!entries.length) return `
    <div class="empty-mini">
      <div class="empty-mini-icon">${icon('clock', 28, 'var(--text-muted)')}</div>
      <div class="empty-mini-title">No upcoming doses</div>
      <div class="empty-mini-sub">Nothing scheduled after today</div>
    </div>`;
  return `
    <div class="upcoming-card">
      ${entries.map(e => `
        <div class="upcoming-row">
          <div class="upcoming-time-col">
            <div class="upcoming-time">${e.time}</div>
            <div class="upcoming-day">${e.day}</div>
          </div>
          <div class="upcoming-divider"></div>
          <div style="flex:1;">
            <div class="upcoming-label">${e.label}</div>
            <div class="upcoming-sub">${e.sub}</div>
          </div>
          <div style="color:var(--text-muted);">${icon('chevron-right', 16, 'var(--text-muted)')}</div>
        </div>`).join('')}
    </div>`;
}

// Emergency access strip (always present at bottom of today screens)
function emergencyStrip(screen = 'today-emergency-placeholder') {
  return `
    <div class="emergency-strip" onclick="showScreen('${screen}')" id="emergency-strip">
      <div class="emergency-strip-icon">${icon('emergency', 18, 'var(--s2b-urgent)', 1.75)}</div>
      <div>
        <div class="emergency-strip-label">Emergency Help</div>
        <div class="emergency-strip-sub">Severe reaction or urgent concern</div>
      </div>
      <div>${icon('chevron-right', 16, 'var(--text-muted)')}</div>
    </div>`;
}

// ─────────────────────────────────────────────
// SCREEN: PATIENT — TODAY  (STATE B — Default)
// Some tasks done, dose pending, health check pending
// ─────────────────────────────────────────────
SCREENS['patient-today'] = () => `
  <div class="today-screen">
    ${statusBar('transparent')}

    <!-- HEADER -->
    <div class="today-header">
      <div class="today-header-top">
        <div>
          <div class="today-date-label">Tuesday, September 9, 2026</div>
          <div class="today-greeting">${greeting()},<br>Alex</div>
          <div class="today-greeting-sub">Here's your Safe2Bite plan for today.</div>
        </div>
        <div class="today-notif-btn" onclick="showScreen('patient-today')" id="notif-btn">
          ${icon('bell', 20, 'var(--s2b-blue)', 1.75)}
          <div class="notif-dot"></div>
        </div>
      </div>
      <!-- Daily status strip -->
      ${statusRing(50, 2, 4, 'ring-on-track')}
    </div>

    <!-- HEALTH ASSESSMENT -->
    <div class="today-section-header" style="margin-top:18px;">
      <div class="today-section-title">Daily Health Check</div>
    </div>
    <div class="today-section">
      ${healthCard('not-started', 'today-assessment-placeholder')}
    </div>

    <!-- TODAY'S DOSE -->
    <div class="today-section-header">
      <div class="today-section-title">Today's Dose</div>
      <div class="today-section-link" onclick="showScreen('patient-treatment')">View Plan</div>
    </div>
    <div class="today-section">
      ${todayDoseCard('upcoming', '5 mg', '8:00', 'AM', 'Take with food after breakfast · Scheduled dose', 'View Dose', 'view-dose-btn-b', 'I Did Not Take It', 'missed-dose-btn-b', 'today-state-e')}
    </div>

    <!-- TODAY'S TASKS -->
    <div class="today-section-header">
      <div class="today-section-title">Today's Tasks</div>
      <div class="today-section-link">4 tasks</div>
    </div>
    <div class="today-section">
      ${todayTasksCard([
        { iconName: 'heart-pulse', iconClass: 'green',  title: 'Health Assessment',  sub: 'How are you feeling today?',        status: 'done',    screen: 'today-assessment-placeholder' },
        { iconName: 'treatment',   iconClass: 'blue',   title: "Today's Dose",        sub: '5 mg · Scheduled 8:00 AM',         status: 'due',     screen: 'patient-treatment' },
        { iconName: 'reaction',    iconClass: 'yellow', title: 'Reaction Check',      sub: 'After dose · 30 min observation',  status: 'pending', screen: 'today-reaction-placeholder' },
        { iconName: 'food',        iconClass: 'teal',   title: 'Food Intake',         sub: 'Record today\'s meals',            status: 'pending', screen: 'today-food-placeholder' },
      ])}
    </div>

    <!-- COMING UP -->
    <div class="today-section-header">
      <div class="today-section-title">Coming Up</div>
      <div class="today-section-link" onclick="showScreen('patient-treatment')">Full Schedule</div>
    </div>
    <div class="today-section">
      ${todayUpcomingCard([
        { time: '8:00', day: 'Tomorrow', label: 'Scheduled Dose', sub: '5 mg · Same dose, with food' },
        { time: '9:00', day: 'Thu', label: 'Dose Observation Window', sub: '30 min after tomorrow\'s dose' },
      ])}
    </div>

    <!-- TREATMENT PROGRESS -->
    <div class="today-section-header">
      <div class="today-section-title">Treatment Progress</div>
      <div class="today-section-link" onclick="showScreen('patient-progress')">Details</div>
    </div>
    <div class="today-section">
      ${todayProgressCard('Phase 2', 'Week 6', 'Dose Buildup', 62)}
    </div>

    <!-- CARE TEAM -->
    <div class="today-section-header">
      <div class="today-section-title">Your Care Team</div>
      <div class="today-section-link" onclick="showScreen('patient-care')">All Messages</div>
    </div>
    <div class="today-section" style="margin-bottom:20px;">
      ${todayCareCard('available')}
    </div>

    <!-- EMERGENCY STRIP -->
    ${emergencyStrip('today-emergency-placeholder')}

    ${patientNav('today')}
  </div>`;

INFO['patient-today'] = {
  screen: 'Patient — Today (State B)',
  role: 'patient',
  desc: 'Pass 3 Today Dashboard — State B (default). Some tasks done, dose pending, health check pending. The patient\'s primary home screen with full daily care summary.',
  ia: [
    { title: 'Today Header', body: 'Dynamic greeting + date + notification bell + daily status ring' },
    { title: 'Health Assessment Card', body: 'Prominent card to start daily check — links to Pass 4' },
    { title: "Today's Dose Card", body: 'State-aware dose card (upcoming/due/completed/missed/review)' },
    { title: "Today's Tasks", body: '4 tasks with icon, status chip, and tap-to-navigate' },
    { title: 'Coming Up', body: 'Next 2 upcoming scheduled events' },
    { title: 'Treatment Progress', body: 'Phase, week, % ring, progress bar' },
    { title: 'Care Team', body: 'Doctor card with availability status + message button' },
    { title: 'Emergency Strip', body: 'Always-visible subtle emergency access at bottom' },
  ],
  notes: 'State B = partial completion. See today-state-a through today-state-g for full state variations.'
};

// ─────────────────────────────────────────────
// SCREEN: TODAY — STATE A (Morning / Nothing started)
// ─────────────────────────────────────────────
SCREENS['today-state-a'] = () => `
  <div class="today-screen">
    ${statusBar('transparent')}
    <div class="today-header">
      <div class="today-header-top">
        <div>
          <div class="today-date-label">Tuesday, September 9, 2026</div>
          <div class="today-greeting">Good morning,<br>Alex</div>
          <div class="today-greeting-sub">Here's your Safe2Bite plan for today.</div>
        </div>
        <div class="today-notif-btn" id="notif-btn-a">${icon('bell', 20, 'var(--s2b-blue)', 1.75)}</div>
      </div>
      ${statusRing(0, 0, 4, 'ring-on-track')}
    </div>

    <div class="today-section-header" style="margin-top:18px;">
      <div class="today-section-title">Daily Health Check</div>
    </div>
    <div class="today-section">
      ${healthCard('not-started', 'today-assessment-placeholder')}
    </div>

    <div class="today-section-header">
      <div class="today-section-title">Today's Dose</div>
      <div class="today-section-link" onclick="showScreen('patient-treatment')">View Plan</div>
    </div>
    <div class="today-section">
      ${todayDoseCard('upcoming', '5 mg', '8:00', 'AM', 'Take with food after breakfast · Due this morning', 'View Dose', 'view-dose-a', 'I Did Not Take It', 'missed-a', 'today-state-e')}
    </div>

    <div class="today-section-header">
      <div class="today-section-title">Today's Tasks</div>
      <div class="today-section-link">4 tasks</div>
    </div>
    <div class="today-section">
      ${todayTasksCard([
        { iconName: 'heart-pulse', iconClass: 'blue',   title: 'Health Assessment',  sub: 'Start with how you\'re feeling',   status: 'pending', screen: 'today-assessment-placeholder' },
        { iconName: 'treatment',   iconClass: 'blue',   title: "Today's Dose",        sub: '5 mg · Scheduled 8:00 AM',        status: 'pending', screen: 'patient-treatment' },
        { iconName: 'reaction',    iconClass: 'yellow', title: 'Reaction Check',      sub: 'After dose · 30 min observation', status: 'pending', screen: 'today-reaction-placeholder' },
        { iconName: 'food',        iconClass: 'teal',   title: 'Food Intake',         sub: 'Record today\'s meals',           status: 'pending', screen: 'today-food-placeholder' },
      ])}
    </div>

    <div class="today-section-header">
      <div class="today-section-title">Your Care Team</div>
      <div class="today-section-link" onclick="showScreen('patient-care')">All Messages</div>
    </div>
    <div class="today-section" style="margin-bottom:20px;">
      ${todayCareCard('available')}
    </div>

    ${emergencyStrip('today-emergency-placeholder')}
    ${patientNav('today')}
  </div>`;

INFO['today-state-a'] = {
  screen: 'Today — State A (Morning, Not Started)',
  role: 'patient',
  desc: 'Early morning state — no tasks completed. Status ring shows 0/4. No alert banner shown. Assessment and dose both pending.',
  ia: [{ title: 'Status Ring', body: '0/4 tasks — shows "On Track" as it is early and nothing is overdue' }],
  notes: 'State A: calm, clean. No alarm. Patient just opened app. Encourage starting the day.'
};

// ─────────────────────────────────────────────
// SCREEN: TODAY — STATE C (All tasks complete)
// ─────────────────────────────────────────────
SCREENS['today-state-c'] = () => `
  <div class="today-screen">
    ${statusBar('transparent')}
    <div class="today-header">
      <div class="today-header-top">
        <div>
          <div class="today-date-label">Tuesday, September 9, 2026</div>
          <div class="today-greeting">${greeting()},<br>Alex</div>
          <div class="today-greeting-sub">You've completed all of today's care tasks.</div>
        </div>
        <div class="today-notif-btn" id="notif-btn-c">${icon('bell', 20, 'var(--s2b-blue)', 1.75)}</div>
      </div>
      ${statusRing(100, 4, 4, 'ring-complete')}
    </div>

    <!-- All done celebration bar -->
    <div style="padding:0 20px; margin-top:18px; margin-bottom:16px;">
      <div style="background:var(--s2b-success-bg); border:1.5px solid #a7e6c5; border-radius:var(--radius-xl); padding:14px 16px; display:flex; align-items:center; gap:12px;">
        <div style="width:40px;height:40px;border-radius:50%;background:var(--s2b-success);display:flex;align-items:center;justify-content:center;flex-shrink:0;">${icon('check-circle-filled', 22, 'white', 2)}</div>
        <div>
          <div style="font-size:14px;font-weight:700;color:var(--s2b-success);">All Done for Today</div>
          <div style="font-size:12px;color:var(--text-secondary);">Great work — your care plan is complete.</div>
        </div>
      </div>
    </div>

    <div class="today-section-header">
      <div class="today-section-title">Today's Tasks</div>
      <div class="today-section-link">4 of 4 done</div>
    </div>
    <div class="today-section">
      ${todayTasksCard([
        { iconName: 'heart-pulse', iconClass: 'green', title: 'Health Assessment',  sub: 'Completed 7:52 AM — No concerns',  status: 'done', screen: 'today-assessment-placeholder' },
        { iconName: 'treatment',   iconClass: 'green', title: "Today's Dose",        sub: 'Confirmed 8:11 AM',               status: 'done', screen: 'patient-treatment' },
        { iconName: 'reaction',    iconClass: 'green', title: 'Reaction Check',      sub: 'Completed 8:42 AM — No reaction', status: 'done', screen: 'today-reaction-placeholder' },
        { iconName: 'food',        iconClass: 'green', title: 'Food Intake',         sub: 'Recorded · 3 meals logged',       status: 'done', screen: 'today-food-placeholder' },
      ])}
    </div>

    <div class="today-section-header">
      <div class="today-section-title">Health Check</div>
    </div>
    <div class="today-section">
      ${healthCard('completed', 'today-assessment-placeholder')}
    </div>

    <div class="today-section-header">
      <div class="today-section-title">Today's Dose</div>
    </div>
    <div class="today-section">
      ${todayDoseCard('completed', '5 mg', '8:11', 'AM', 'Confirmed — taken with breakfast. No reaction reported.', 'View Details', 'view-dose-c')}
    </div>

    <div class="today-section-header">
      <div class="today-section-title">Coming Up</div>
      <div class="today-section-link" onclick="showScreen('patient-treatment')">Full Schedule</div>
    </div>
    <div class="today-section">
      ${todayUpcomingCard([{ time: '8:00', day: 'Tomorrow', label: 'Scheduled Dose', sub: '5 mg · Same dose, with food' }])}
    </div>

    <div class="today-section-header">
      <div class="today-section-title">Treatment Progress</div>
      <div class="today-section-link" onclick="showScreen('patient-progress')">Details</div>
    </div>
    <div class="today-section">
      ${todayProgressCard('Phase 2', 'Week 6', 'Dose Buildup', 62)}
    </div>

    <div class="today-section-header">
      <div class="today-section-title">Your Care Team</div>
    </div>
    <div class="today-section" style="margin-bottom:20px;">
      ${todayCareCard('available')}
    </div>

    ${emergencyStrip('today-emergency-placeholder')}
    ${patientNav('today')}
  </div>`;

INFO['today-state-c'] = { screen: 'Today — State C (All Complete)', role: 'patient', desc: 'All 4 daily tasks done. Ring shows 4/4 with green "Complete" status. Celebration bar at top. Dose card in completed state.', ia: [], notes: 'State C: positive reinforcement. Calm green palette. Focus on tomorrow\'s schedule.' };

// ─────────────────────────────────────────────
// SCREEN: TODAY — STATE D (Dose Due Now)
// ─────────────────────────────────────────────
SCREENS['today-state-d'] = () => `
  <div class="today-screen">
    ${statusBar('transparent')}
    <div class="today-header">
      <div class="today-header-top">
        <div>
          <div class="today-date-label">Tuesday, September 9, 2026</div>
          <div class="today-greeting">${greeting()},<br>Alex</div>
          <div class="today-greeting-sub">Your dose is ready. Take it when you're ready.</div>
        </div>
        <div class="today-notif-btn" id="notif-btn-d">
          ${icon('bell', 20, 'var(--s2b-blue)', 1.75)}
          <div class="notif-dot"></div>
        </div>
      </div>
      ${statusRing(25, 1, 4, 'ring-on-track')}
    </div>

    <div class="today-section-header" style="margin-top:18px;">
      <div class="today-section-title">Dose Ready</div>
    </div>
    <div class="today-section">
      ${todayDoseCard('due-now', '5 mg', '8:00', 'AM', 'Your scheduled dose is ready. Take with food and stay nearby for 30 minutes.', 'View Dose Details', 'confirm-dose-d', 'I Did Not Take It', 'missed-d', 'today-state-e')}
    </div>

    <div class="today-section-header">
      <div class="today-section-title">Daily Health Check</div>
    </div>
    <div class="today-section">
      ${healthCard('completed', 'today-assessment-placeholder')}
    </div>

    <div class="today-section-header">
      <div class="today-section-title">Today's Tasks</div>
    </div>
    <div class="today-section">
      ${todayTasksCard([
        { iconName: 'heart-pulse', iconClass: 'green',  title: 'Health Assessment',  sub: 'Completed 7:48 AM',               status: 'done',    screen: 'today-assessment-placeholder' },
        { iconName: 'treatment',   iconClass: 'teal',   title: "Today's Dose",        sub: '5 mg · Due Now',                  status: 'due-now', screen: 'patient-treatment' },
        { iconName: 'reaction',    iconClass: 'yellow', title: 'Reaction Check',      sub: 'After dose · 30 min observation', status: 'pending', screen: 'today-reaction-placeholder' },
        { iconName: 'food',        iconClass: 'teal',   title: 'Food Intake',         sub: 'Record today\'s meals',           status: 'pending', screen: 'today-food-placeholder' },
      ])}
    </div>

    <div class="today-section-header">
      <div class="today-section-title">Your Care Team</div>
    </div>
    <div class="today-section" style="margin-bottom:20px;">
      ${todayCareCard('available')}
    </div>

    ${emergencyStrip('today-emergency-placeholder')}
    ${patientNav('today')}
  </div>`;

INFO['today-state-d'] = { screen: 'Today — State D (Dose Due Now)', role: 'patient', desc: 'Dose due now — green pulsing dose card. Health check complete. Reaction and food still pending.', ia: [], notes: 'State D: green dose card with pulse animation. Calm language — not alarming.' };

// ─────────────────────────────────────────────
// SCREEN: TODAY — STATE E (Missed Dose)
// ─────────────────────────────────────────────
SCREENS['today-state-e'] = () => `
  <div class="today-screen">
    ${statusBar('transparent')}
    <div class="today-header">
      <div class="today-header-top">
        <div>
          <div class="today-date-label">Tuesday, September 9, 2026</div>
          <div class="today-greeting">${greeting()},<br>Alex</div>
          <div class="today-greeting-sub">Your dose was not recorded today.</div>
        </div>
        <div class="today-notif-btn" id="notif-btn-e">
          ${icon('bell', 20, 'var(--s2b-blue)', 1.75)}
          <div class="notif-dot"></div>
        </div>
      </div>
      ${statusRing(25, 1, 4, 'ring-action')}
    </div>

    <!-- Missed dose attention card -->
    <div style="padding:0 20px; margin-top:18px; margin-bottom:16px;">
      <div class="attention-card">
        <div class="attention-card-icon">${icon('alerts', 20, 'var(--s2b-attention)', 1.75)}</div>
        <div style="flex:1;">
          <div class="attention-card-title">Dose Not Recorded</div>
          <div class="attention-card-body">Your scheduled 8:00 AM dose was not confirmed. Please contact your care team before taking a late dose.</div>
          <button class="attention-card-action" onclick="showScreen('patient-care')">Message Care Team</button>
        </div>
      </div>
    </div>

    <div class="today-section-header">
      <div class="today-section-title">Today's Dose</div>
    </div>
    <div class="today-section">
      ${todayDoseCard('missed', '5 mg', '8:00', 'AM', 'This dose was not recorded. Do not take without guidance from your care team.', 'Contact Care Team', 'contact-care-e')}
    </div>

    <div class="today-section-header">
      <div class="today-section-title">Today's Tasks</div>
    </div>
    <div class="today-section">
      ${todayTasksCard([
        { iconName: 'heart-pulse', iconClass: 'green',  title: 'Health Assessment',  sub: 'Completed 7:52 AM',               status: 'done',   screen: 'today-assessment-placeholder' },
        { iconName: 'treatment',   iconClass: 'red',    title: "Today's Dose",        sub: 'Missed — 8:00 AM',                status: 'missed', screen: 'patient-treatment' },
        { iconName: 'reaction',    iconClass: 'yellow', title: 'Reaction Check',      sub: 'Skipped — dose not taken',        status: 'skipped',screen: 'today-reaction-placeholder' },
        { iconName: 'food',        iconClass: 'teal',   title: 'Food Intake',         sub: 'Record today\'s meals',           status: 'pending',screen: 'today-food-placeholder' },
      ])}
    </div>

    <div class="today-section-header">
      <div class="today-section-title">Your Care Team</div>
    </div>
    <div class="today-section" style="margin-bottom:20px;">
      ${todayCareCard('responding')}
    </div>

    ${emergencyStrip('today-emergency-placeholder')}
    ${patientNav('today')}
  </div>`;

INFO['today-state-e'] = { screen: 'Today — State E (Missed Dose)', role: 'patient', desc: 'Dose was not recorded. Orange "Needs Attention" ring. Red dose card. Attention card with care team CTA. Clear instructions — do not re-dose without guidance.', ia: [], notes: 'State E: important but not critical. Orange palette. Safe language. Care team messaging is primary CTA.' };

// ─────────────────────────────────────────────
// SCREEN: TODAY — STATE F (Care Team Alert)
// ─────────────────────────────────────────────
SCREENS['today-state-f'] = () => `
  <div class="today-screen">
    ${statusBar('transparent')}
    <div class="today-header">
      <div class="today-header-top">
        <div>
          <div class="today-date-label">Tuesday, September 9, 2026</div>
          <div class="today-greeting">${greeting()},<br>Alex</div>
          <div class="today-greeting-sub">Your care team has sent you a message.</div>
        </div>
        <div class="today-notif-btn" id="notif-btn-f">
          ${icon('bell', 20, 'var(--s2b-blue)', 1.75)}
          <div class="notif-dot"></div>
        </div>
      </div>
      ${statusRing(50, 2, 4, 'ring-on-track')}
    </div>

    <!-- Care team message alert -->
    <div style="padding:0 20px; margin-top:18px; margin-bottom:16px;">
      <div class="attention-card info-style">
        <div class="attention-card-icon">${icon('send', 18, 'var(--s2b-teal)', 1.75)}</div>
        <div style="flex:1;">
          <div class="attention-card-title">New Message from Dr. Mitchell</div>
          <div class="attention-card-body">Your care team has reviewed your recent assessment and has an update for your plan.</div>
          <button class="attention-card-action" onclick="showScreen('patient-care')">Read Message</button>
        </div>
      </div>
    </div>

    <div class="today-section-header">
      <div class="today-section-title">Daily Health Check</div>
    </div>
    <div class="today-section">
      ${healthCard('completed', 'today-assessment-placeholder')}
    </div>

    <div class="today-section-header">
      <div class="today-section-title">Today's Dose</div>
      <div class="today-section-link" onclick="showScreen('patient-treatment')">View Plan</div>
    </div>
    <div class="today-section">
      ${todayDoseCard('upcoming', '5 mg', '8:00', 'AM', 'Take with food after breakfast · Please read care team message first', 'View Dose', 'view-dose-f', 'I Did Not Take It', 'missed-f', 'today-state-e')}
    </div>

    <div class="today-section-header">
      <div class="today-section-title">Today's Tasks</div>
    </div>
    <div class="today-section">
      ${todayTasksCard([
        { iconName: 'heart-pulse', iconClass: 'green',  title: 'Health Assessment',  sub: 'Completed 7:52 AM',               status: 'done',    screen: 'today-assessment-placeholder' },
        { iconName: 'treatment',   iconClass: 'blue',   title: "Today's Dose",        sub: '5 mg · Pending',                  status: 'pending', screen: 'patient-treatment' },
        { iconName: 'reaction',    iconClass: 'yellow', title: 'Reaction Check',      sub: 'After dose · 30 min observation', status: 'pending', screen: 'today-reaction-placeholder' },
        { iconName: 'food',        iconClass: 'green',  title: 'Food Intake',         sub: '2 meals recorded',               status: 'done',    screen: 'today-food-placeholder' },
      ])}
    </div>

    <div class="today-section-header">
      <div class="today-section-title">Your Care Team</div>
    </div>
    <div class="today-section" style="margin-bottom:20px;">
      ${todayCareCard('new-message')}
    </div>

    ${emergencyStrip('today-emergency-placeholder')}
    ${patientNav('today')}
  </div>`;

INFO['today-state-f'] = { screen: 'Today — State F (Care Team Alert)', role: 'patient', desc: 'Care team has sent a new message. Teal info-style alert card at top. Care team card shows new-message status.', ia: [], notes: 'State F: informational, not alarming. Teal palette. Primary CTA is reading the message.' };

// ─────────────────────────────────────────────
// SCREEN: TODAY — STATE G (Critical Alert)
// ─────────────────────────────────────────────
SCREENS['today-state-g'] = () => `
  <div class="today-screen">
    ${statusBar('transparent')}
    <div class="today-header">
      <div class="today-header-top">
        <div>
          <div class="today-date-label">Tuesday, September 9, 2026</div>
          <div class="today-greeting">${greeting()},<br>Alex</div>
          <div class="today-greeting-sub">Important — please read your care team's message now.</div>
        </div>
        <div class="today-notif-btn" id="notif-btn-g">
          ${icon('bell', 20, 'var(--s2b-blue)', 1.75)}
          <div class="notif-dot"></div>
        </div>
      </div>
      ${statusRing(25, 1, 4, 'ring-critical')}
    </div>

    <!-- Critical banner -->
    <div style="padding:0 20px; margin-top:18px; margin-bottom:18px;">
      <div class="critical-banner">
        <div class="critical-banner-icon">${icon('emergency', 20, 'white', 2)}</div>
        <div style="flex:1;">
          <div class="critical-banner-title">Action Required — Care Team</div>
          <div class="critical-banner-body">Your care team has flagged an urgent concern with your recent health report. Please contact them immediately before taking today's dose.</div>
          <button class="critical-banner-btn" onclick="showScreen('patient-care')">Contact Care Team Now</button>
        </div>
      </div>
    </div>

    <div class="today-section-header">
      <div class="today-section-title">Today's Dose — Hold</div>
    </div>
    <div class="today-section">
      ${todayDoseCard('needs-review', '5 mg', '8:00', 'AM', 'Do not take this dose until you have spoken with your care team. This is a precaution — your care team will confirm next steps.', 'Contact Care Team', 'contact-g')}
    </div>

    <div class="today-section-header">
      <div class="today-section-title">Today's Tasks</div>
    </div>
    <div class="today-section">
      ${todayTasksCard([
        { iconName: 'heart-pulse', iconClass: 'green',  title: 'Health Assessment',  sub: 'Flagged by care team — review', status: 'done',    screen: 'today-assessment-placeholder' },
        { iconName: 'treatment',   iconClass: 'red',    title: "Today's Dose",        sub: 'On hold — awaiting guidance',  status: 'missed',  screen: 'patient-treatment' },
        { iconName: 'reaction',    iconClass: 'yellow', title: 'Reaction Check',      sub: 'Pending dose decision',         status: 'pending', screen: 'today-reaction-placeholder' },
        { iconName: 'food',        iconClass: 'teal',   title: 'Food Intake',         sub: 'Record today\'s meals',         status: 'pending', screen: 'today-food-placeholder' },
      ])}
    </div>

    <div class="today-section-header">
      <div class="today-section-title">Your Care Team</div>
    </div>
    <div class="today-section" style="margin-bottom:16px;">
      ${todayCareCard('new-message')}
    </div>

    ${emergencyStrip('today-emergency-placeholder')}
    ${patientNav('today')}
  </div>`;

INFO['today-state-g'] = { screen: 'Today — State G (Critical Alert)', role: 'patient', desc: 'Critical — care team has flagged concern. Red pulsing banner at top. Red ring. Dose card in needs-review state with explicit hold instruction. Emergency strip visible.', ia: [], notes: 'State G: highest urgency. Red palette. Clear "do not dose" instruction. Care team contact is primary CTA. Not technically an emergency (anaphylaxis) — that is a separate flow.' };

// ─────────────────────────────────────────────
// SCREEN: TODAY — LOADING STATE
// ─────────────────────────────────────────────
SCREENS['today-loading'] = () => `
  <div class="today-screen">
    ${statusBar('transparent')}
    <div class="today-skeleton-header">
      <div class="skeleton skeleton-greeting" style="height:11px; width:140px; margin-bottom:10px;"></div>
      <div class="skeleton" style="height:26px; width:180px; margin-bottom:8px; border-radius:var(--radius-md);"></div>
      <div class="skeleton" style="height:13px; width:220px; border-radius:var(--radius-sm);"></div>

      <!-- Skeleton status strip -->
      <div style="background:white; border:1.5px solid var(--border-light); border-radius:var(--radius-xl); padding:12px 16px; display:flex; align-items:center; gap:12px; margin-top:18px; box-shadow:var(--shadow-card);">
        <div class="skeleton" style="width:44px; height:44px; border-radius:50%; flex-shrink:0;"></div>
        <div style="flex:1;">
          <div class="skeleton" style="height:14px; width:80px; margin-bottom:6px; border-radius:var(--radius-sm);"></div>
          <div class="skeleton" style="height:12px; width:120px; border-radius:var(--radius-sm);"></div>
        </div>
        <div class="skeleton" style="width:70px; height:22px; border-radius:999px;"></div>
      </div>
    </div>

    <!-- Skeleton health card -->
    <div style="padding:0 20px; margin-top:20px; margin-bottom:16px;">
      <div style="background:white; border:1.5px solid var(--border-light); border-radius:var(--radius-xl); padding:16px; display:flex; gap:14px; box-shadow:var(--shadow-card);">
        <div class="skeleton" style="width:52px; height:52px; border-radius:var(--radius-lg); flex-shrink:0;"></div>
        <div style="flex:1;">
          <div class="skeleton" style="height:14px; width:130px; margin-bottom:6px; border-radius:var(--radius-sm);"></div>
          <div class="skeleton" style="height:12px; width:200px; border-radius:var(--radius-sm);"></div>
        </div>
        <div class="skeleton" style="width:80px; height:32px; border-radius:999px; flex-shrink:0;"></div>
      </div>
    </div>

    <!-- Skeleton dose card -->
    <div style="padding:0 20px; margin-bottom:16px;">
      <div class="skeleton" style="height:150px; border-radius:var(--radius-xl);"></div>
    </div>

    <!-- Skeleton task list -->
    <div style="padding:0 20px; margin-bottom:16px;">
      <div style="background:white; border:1.5px solid var(--border-light); border-radius:var(--radius-xl); overflow:hidden; box-shadow:var(--shadow-card);">
        ${[1,2,3,4].map(() => `
          <div style="display:flex; align-items:center; gap:12px; padding:13px 16px; border-bottom:1px solid var(--border-light);">
            <div class="skeleton" style="width:42px; height:42px; border-radius:var(--radius-md); flex-shrink:0;"></div>
            <div style="flex:1;">
              <div class="skeleton" style="height:14px; width:130px; margin-bottom:6px; border-radius:var(--radius-sm);"></div>
              <div class="skeleton" style="height:11px; width:160px; border-radius:var(--radius-sm);"></div>
            </div>
            <div class="skeleton" style="width:60px; height:22px; border-radius:999px;"></div>
          </div>`).join('')}
      </div>
    </div>

    <div style="text-align:center; padding:12px; color:var(--text-muted); font-size:12px; font-weight:500;">
      Loading your care plan...
    </div>

    ${patientNav('today')}
  </div>`;

INFO['today-loading'] = { screen: 'Today — Loading State', role: 'patient', desc: 'Skeleton loading state for the Today dashboard. Shows placeholder shapes for header, status strip, health card, dose card, and task list. Used while patient profile, dose, and tasks load from backend.', ia: [], notes: 'Use shimmer animation (already defined in base CSS). Content areas maintain correct dimensions to prevent layout shift on load.' };

// ─────────────────────────────────────────────
// SCREEN: TODAY — ERROR STATE
// ─────────────────────────────────────────────
SCREENS['today-error'] = () => `
  <div class="today-screen">
    ${statusBar('transparent')}
    <div style="height:44px; background:var(--surface-base);"></div>

    <div style="flex:1; display:flex; flex-direction:column; align-items:center; justify-content:center; padding:40px 32px; text-align:center; margin-top:60px;">
      <div style="width:80px; height:80px; border-radius:50%; background:var(--surface-card); border:2px solid var(--border-light); display:flex; align-items:center; justify-content:center; margin:0 auto 24px; box-shadow:var(--shadow-card);">
        ${icon('wifi-off', 36, 'var(--text-muted)', 1.5)}
      </div>
      <div style="font-size:20px; font-weight:800; color:var(--s2b-blue); margin-bottom:10px; line-height:1.3;">Unable to Load<br>Today's Plan</div>
      <div style="font-size:14px; color:var(--text-secondary); line-height:1.65; max-width:260px; margin-bottom:32px;">We couldn't load your latest care information. Please check your connection and try again.</div>
      <button class="btn btn-primary" style="max-width:240px;" onclick="showScreen('patient-today')" id="retry-today-btn">${icon('refresh', 16, 'white', 2)} Try Again</button>
      <button class="btn btn-text" style="margin-top:12px;" onclick="showScreen('patient-care')" id="contact-support-btn">Contact Support</button>
    </div>

    <div style="padding:0 20px 24px; text-align:center;">
      <div style="font-size:11px; color:var(--text-muted); line-height:1.5;">Your previously loaded information is available while offline. Some features may be limited.</div>
    </div>

    ${patientNav('today')}
  </div>`;

INFO['today-error'] = { screen: 'Today — Error State', role: 'patient', desc: 'Network error state for Today dashboard. Shows wifi-off icon, friendly message, retry button, and support contact. No technical error codes exposed.', ia: [], notes: 'Error state: calm, not alarming. Assures patient that offline data may still be available. Retry + support CTA.' };


// ─────────────────────────────────────────────
// ─────────────────────────────────────────────
// PLACEHOLDER: HEALTH ASSESSMENT (→ Pass 4)
// Pass 4 temporarily disabled for app review.
// ─────────────────────────────────────────────
SCREENS['today-assessment-placeholder'] = () => `
  <div class="placeholder-screen">
    ${statusBar('var(--surface-base)')}
    <div style="padding:8px 20px 12px; display:flex; align-items:center; gap:10px;">
      <button style="background:none;border:none;cursor:pointer;padding:4px;" onclick="showScreen('patient-today')" id="back-assessment-btn">${icon('arrow-left', 22, 'var(--s2b-blue)')}</button>
      <div style="font-size:17px; font-weight:700; color:var(--s2b-blue);">Health Assessment</div>
    </div>
    <div class="placeholder-body">
      <div class="placeholder-pass-badge">Coming in Pass 4</div>
      <div class="placeholder-icon-circle">${icon('heart-pulse', 36, 'var(--s2b-teal)', 1.5)}</div>
      <div class="placeholder-title">Daily Health Assessment</div>
      <div class="placeholder-desc">The daily health assessment flow will be added in Pass 4. This screen is temporarily shown as a placeholder for the app review.</div>
      <button class="btn btn-secondary" style="max-width:240px; font-size:14px; border-radius:var(--radius-full);" onclick="showScreen('patient-today')" id="back-to-today-assessment">Back to Today</button>
    </div>
    ${patientNav('today')}
  </div>`;

INFO['today-assessment-placeholder'] = {
  screen: 'Health Assessment Placeholder',
  role: 'patient',
  desc: 'Pass 4 is temporarily disabled for app review. The Today dashboard remains available.',
  ia: [],
  notes: 'Pass 4 can be restored/implemented after the app review.'
};

// ─────────────────────────────────────────────
// PLACEHOLDER: REACTION CHECK (→ Pass 6)
// ─────────────────────────────────────────────
SCREENS['today-reaction-placeholder'] = () => `
  <div class="placeholder-screen">
    ${statusBar('var(--surface-base)')}
    <div style="padding:8px 20px 12px; display:flex; align-items:center; gap:10px;">
      <button style="background:none;border:none;cursor:pointer;padding:4px;" onclick="showScreen('patient-today')" id="back-reaction-btn">${icon('arrow-left', 22, 'var(--s2b-blue)')}</button>
      <div style="font-size:17px; font-weight:700; color:var(--s2b-blue);">Reaction Check</div>
    </div>
    <div class="placeholder-body">
      <div class="placeholder-pass-badge">Coming in Pass 6</div>
      <div class="placeholder-icon-circle">${icon('reaction', 36, 'var(--s2b-teal)', 1.5)}</div>
      <div class="placeholder-title">Reaction Reporting</div>
      <div class="placeholder-desc">Pass 6 will design the post-dose reaction check flow — graded symptom reporting, severity assessment, and escalation paths for unexpected reactions after the dose observation window.</div>
      <button class="btn btn-secondary" style="max-width:240px; font-size:14px; border-radius:var(--radius-full);" onclick="showScreen('patient-today')" id="back-to-today-reaction">Back to Today</button>
    </div>
    ${patientNav('today')}
  </div>`;

// ─────────────────────────────────────────────
// PLACEHOLDER: FOOD INTAKE (→ Pass 7)
// ─────────────────────────────────────────────
SCREENS['today-food-placeholder'] = () => `
  <div class="placeholder-screen">
    ${statusBar('var(--surface-base)')}
    <div style="padding:8px 20px 12px; display:flex; align-items:center; gap:10px;">
      <button style="background:none;border:none;cursor:pointer;padding:4px;" onclick="showScreen('patient-today')" id="back-food-btn">${icon('arrow-left', 22, 'var(--s2b-blue)')}</button>
      <div style="font-size:17px; font-weight:700; color:var(--s2b-blue);">Food Intake</div>
    </div>
    <div class="placeholder-body">
      <div class="placeholder-pass-badge">Coming in Pass 7</div>
      <div class="placeholder-icon-circle">${icon('food', 36, 'var(--s2b-teal)', 1.5)}</div>
      <div class="placeholder-title">Food Intake Log</div>
      <div class="placeholder-desc">Pass 7 will design the daily food intake recording flow — allergy-aware meal logging with safe food tracking, meal timing relative to dose, and dietary pattern visibility for the care team.</div>
      <button class="btn btn-secondary" style="max-width:240px; font-size:14px; border-radius:var(--radius-full);" onclick="showScreen('patient-today')" id="back-to-today-food">Back to Today</button>
    </div>
    ${patientNav('today')}
  </div>`;

// ─────────────────────────────────────────────
// PLACEHOLDER: EMERGENCY (→ Future Pass)
// ─────────────────────────────────────────────
SCREENS['today-emergency-placeholder'] = () => `
  <div class="placeholder-screen">
    ${statusBar('var(--surface-base)')}
    <div style="padding:8px 20px 12px; display:flex; align-items:center; gap:10px;">
      <button style="background:none;border:none;cursor:pointer;padding:4px;" onclick="showScreen('patient-today')" id="back-emergency-btn">${icon('arrow-left', 22, 'var(--s2b-blue)')}</button>
      <div style="font-size:17px; font-weight:700; color:var(--s2b-blue);">Emergency Help</div>
    </div>
    <div class="placeholder-body">
      <div class="placeholder-pass-badge">Coming in a Future Pass</div>
      <div class="placeholder-icon-circle" style="background:var(--s2b-urgent-bg); border-color:#f0c4c4;">${icon('emergency', 36, 'var(--s2b-urgent)', 1.75)}</div>
      <div class="placeholder-title">Emergency Protocol</div>
      <div class="placeholder-desc">The Emergency workflow will provide guided steps for severe allergic reactions, direct contact with the Safe2Bite emergency line, and pre-filled medical information for first responders. All content is clinician-authored.</div>
      <button class="btn btn-secondary" style="max-width:240px; font-size:14px; border-radius:var(--radius-full);" onclick="showScreen('patient-today')" id="back-to-today-emergency">Back to Today</button>
    </div>
    ${patientNav('today')}
  </div>`;

INFO['today-assessment-placeholder'] = { screen: 'Health Assessment Placeholder', role: 'patient', desc: 'Placeholder for Pass 4 — Daily Health Assessment flow. Shows which pass will build this screen.', ia: [], notes: '' };
INFO['today-reaction-placeholder']   = { screen: 'Reaction Check Placeholder',    role: 'patient', desc: 'Placeholder for Pass 6 — Reaction Reporting flow.', ia: [], notes: '' };
INFO['today-food-placeholder']       = { screen: 'Food Intake Placeholder',        role: 'patient', desc: 'Placeholder for Pass 7 — Food Intake Log flow.', ia: [], notes: '' };
INFO['today-emergency-placeholder']  = { screen: 'Emergency Help Placeholder',     role: 'patient', desc: 'Placeholder for future pass — Emergency Protocol flow. Content is clinician-controlled.', ia: [], notes: '' };
INFO['today-state-a'] = INFO['today-state-a'] || { screen: 'Today — State A', role: 'patient', desc: 'Morning, nothing started.', ia: [], notes: '' };
INFO['today-state-c'] = INFO['today-state-c'] || { screen: 'Today — State C', role: 'patient', desc: 'All tasks complete.', ia: [], notes: '' };
INFO['today-state-d'] = INFO['today-state-d'] || { screen: 'Today — State D', role: 'patient', desc: 'Dose due now.', ia: [], notes: '' };
INFO['today-state-e'] = INFO['today-state-e'] || { screen: 'Today — State E', role: 'patient', desc: 'Missed dose.', ia: [], notes: '' };
INFO['today-state-f'] = INFO['today-state-f'] || { screen: 'Today — State F', role: 'patient', desc: 'Care team alert.', ia: [], notes: '' };
INFO['today-state-g'] = INFO['today-state-g'] || { screen: 'Today — State G', role: 'patient', desc: 'Critical alert.', ia: [], notes: '' };
INFO['today-loading'] = INFO['today-loading'] || { screen: 'Today — Loading', role: 'patient', desc: 'Skeleton loading state.', ia: [], notes: '' };
INFO['today-error']   = INFO['today-error']   || { screen: 'Today — Error', role: 'patient', desc: 'Network error — retry.', ia: [], notes: '' };

// ─────────────────────────────────────────────
// SCREEN: PATIENT — TREATMENT
// ─────────────────────────────────────────────
SCREENS['patient-treatment'] = () => `
  <div class="screen-full" style="background:var(--surface-base); min-height:780px;">
    ${statusBar('var(--surface-base)')}
    <div class="mobile-header">
      <div>
        <div class="header-title">Treatment</div>
        <div class="header-subtitle">Your care plan overview</div>
      </div>
    </div>
    
    <!-- Current Treatment -->
    <div style="padding:0 20px 16px;">
      <div style="background:linear-gradient(135deg,var(--s2b-blue),var(--s2b-blue-mid)); border-radius:var(--radius-xl); padding:20px; color:white;">
        <div style="font-size:11px; letter-spacing:0.08em; opacity:0.7; font-weight:600; text-transform:uppercase; margin-bottom:6px;">Current Treatment</div>
        <div style="font-size:20px; font-weight:800; margin-bottom:4px;">Peanut OIT</div>
        <div style="font-size:13px; opacity:0.8; margin-bottom:16px;">Oral Immunotherapy — Phase 2: Buildup</div>
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px;">
          <div style="background:rgba(255,255,255,0.12); border-radius:var(--radius-md); padding:12px;">
            <div style="font-size:10px; opacity:0.7; font-weight:600; text-transform:uppercase; margin-bottom:4px;">Current Dose</div>
            <div style="font-size:22px; font-weight:800;">5 mg</div>
          </div>
          <div style="background:rgba(255,255,255,0.12); border-radius:var(--radius-md); padding:12px;">
            <div style="font-size:10px; opacity:0.7; font-weight:600; text-transform:uppercase; margin-bottom:4px;">Goal Dose</div>
            <div style="font-size:22px; font-weight:800;">300 mg</div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Dose Instructions -->
    <div class="card-section">
      <div class="card-section-title">Dose Instructions</div>
      <div class="card">
        <div class="alert-card info" style="margin-bottom:0; border:none; background:transparent; padding:0;">
          <div class="alert-icon">${icon('info', 20)}</div>
          <div>
            <div class="alert-title">Instructions from Your Care Team</div>
            <div class="alert-body">Take your dose with food. Wait 2 hours before exercise. Contact your care team if you experience any symptoms.</div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Upcoming Doses -->
    <div class="card-section">
      <div class="card-section-title">Upcoming Doses</div>
      <div class="card" style="padding:0;">
        ${[
          { day: 'Today', dose: '5mg', status: 'pending', time: '8:00 AM' },
          { day: 'Tomorrow', dose: '5mg', status: 'scheduled', time: '8:00 AM' },
          { day: 'Thu Sep 10', dose: '5mg', status: 'scheduled', time: '8:00 AM' },
          { day: 'Next Clinic Visit', dose: '→ 7mg', status: 'attention', time: 'Sep 15' },
        ].map(d => `
          <div class="list-item">
            <div class="list-item-icon" style="background:${d.status === 'attention' ? 'var(--s2b-attention-bg)' : 'var(--s2b-blue-light)'}">
              ${d.status === 'attention' ? icon('calendar', 18, 'var(--s2b-attention)') : icon('treatment', 18, 'var(--s2b-blue)')}
            </div>
            <div class="list-item-content">
              <div class="list-item-title">${d.day}</div>
              <div class="list-item-subtitle">${d.dose} · ${d.time}</div>
            </div>
            <span class="status-badge ${d.status === 'pending' ? 'attention' : d.status === 'attention' ? 'attention' : 'completed'}" style="font-size:10px;">
              ${d.status === 'pending' ? 'Due' : d.status === 'attention' ? 'Increase' : 'Scheduled'}
            </span>
          </div>`).join('')}
      </div>
    </div>
    
    <!-- Treatment History Link -->
    <div style="padding:0 20px 100px;">
      <button class="btn btn-secondary" style="width:100%;" id="treatment-history-btn">View Treatment History</button>
    </div>
    
    ${patientNav('treatment')}
  </div>`;

INFO['patient-treatment'] = {
  screen: 'Patient — Treatment',
  role: 'patient',
  desc: 'Full treatment plan overview. Shows current protocol, dose information, goal dose, and upcoming scheduled doses.',
  ia: [
    { title: 'Treatment Overview', body: 'Protocol name, phase, current vs goal dose' },
    { title: 'Dose Instructions', body: 'Care team-configured instructions (not auto-generated)' },
    { title: 'Upcoming Doses', body: 'Next 3–5 scheduled doses + next clinic visit' },
    { title: 'Treatment History', body: 'Full dose history log' },
  ],
  notes: 'All clinical instructions displayed here come from the care team, not the app. No autonomous medical recommendations.'
};

// ─────────────────────────────────────────────
// SCREEN: PATIENT — PROGRESS
// ─────────────────────────────────────────────
SCREENS['patient-progress'] = () => `
  <div class="screen-full" style="background:var(--surface-base); min-height:780px;">
    ${statusBar('var(--surface-base)')}
    <div class="mobile-header">
      <div>
        <div class="header-title">Progress</div>
        <div class="header-subtitle">Your treatment journey</div>
      </div>
    </div>
    
    <!-- Overall Progress -->
    <div style="padding:0 20px 16px;">
      <div class="card">
        <div style="display:flex; align-items:center; gap:16px;">
          <div style="position:relative; width:70px; height:70px; flex-shrink:0;">
            <svg width="70" height="70" viewBox="0 0 70 70">
              <circle cx="35" cy="35" r="30" fill="none" stroke="var(--border-light)" stroke-width="6"/>
              <circle cx="35" cy="35" r="30" fill="none" stroke="var(--s2b-teal)" stroke-width="6" stroke-dasharray="188" stroke-dashoffset="71" stroke-linecap="round" transform="rotate(-90 35 35)"/>
            </svg>
            <div style="position:absolute; inset:0; display:flex; align-items:center; justify-content:center; font-size:14px; font-weight:800; color:var(--s2b-blue);">62%</div>
          </div>
          <div>
            <div style="font-size:15px; font-weight:700; color:var(--text-dark); margin-bottom:4px;">Phase 2: Buildup</div>
            <div style="font-size:12px; color:var(--text-secondary);">Week 6 of estimated 10 weeks</div>
            <div class="status-badge completed" style="margin-top:6px;">● On Track</div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Stats Row -->
    <div class="stat-row">
      <div class="stat-card">
        <div class="stat-value">94%</div>
        <div class="stat-label">Adherence</div>
      </div>
      <div class="stat-card">
        <div class="stat-value">42</div>
        <div class="stat-label">Doses Taken</div>
      </div>
      <div class="stat-card">
        <div class="stat-value">2</div>
        <div class="stat-label">Missed</div>
      </div>
    </div>
    
    <!-- Section List -->
    <div class="card-section">
      <div class="card-section-title">History &amp; Records</div>
      <div class="card" style="padding:0;">
        ${[
          { iconName: 'treatment',  iconColor: 'var(--s2b-blue)',      bg: 'var(--s2b-blue-light)',    label: 'Dose History',          sub: '44 recorded doses',                       badge: null },
          { iconName: 'activity',   iconColor: 'var(--s2b-attention)', bg: 'var(--s2b-attention-bg)', label: 'Reaction History',       sub: '1 mild reaction logged',                  badge: 'attention' },
          { iconName: 'illness',    iconColor: 'var(--text-secondary)',bg: 'var(--surface-base)',      label: 'Illness History',        sub: '0 illness reports',                       badge: null },
          { iconName: 'clipboard',  iconColor: 'var(--s2b-blue)',      bg: 'var(--s2b-blue-light)',    label: 'Assessment History',     sub: '38 assessments completed',                badge: null },
          { iconName: 'award',      iconColor: 'var(--s2b-teal)',      bg: 'var(--s2b-teal-light)',    label: 'Treatment Milestones',   sub: 'Phase 1 complete · Phase 2 in progress',  badge: null },
        ].map(i => `
          <div class="list-item">
            <div class="list-item-icon" style="background:${i.bg};">${icon(i.iconName, 20, i.iconColor)}</div>
            <div class="list-item-content">
              <div class="list-item-title">${i.label}</div>
              <div class="list-item-subtitle">${i.sub}</div>
            </div>
            ${i.badge ? `<span class="status-badge ${i.badge}" style="font-size:10px;">Review</span>` : `<span class="list-item-chevron" style="display:flex;align-items:center;">${icon('chevron', 16, 'var(--text-muted)', 2)}</span>`}
          </div>`).join('')}
      </div>
    </div>
    
    <div style="padding-bottom:80px;"></div>
    ${patientNav('progress')}
  </div>`;

INFO['patient-progress'] = {
  screen: 'Patient — Progress',
  role: 'patient',
  desc: 'Treatment progress overview with adherence stats, history records, and milestones.',
  ia: [
    { title: 'Progress Ring', body: 'Visual % complete for current phase' },
    { title: 'Stats', body: 'Adherence %, total doses, missed doses' },
    { title: 'Dose History', body: 'Full chronological dose log' },
    { title: 'Reaction History', body: 'Logged reactions with severity' },
    { title: 'Illness History', body: 'Illness-related dose holds' },
    { title: 'Assessment History', body: 'All completed assessments' },
    { title: 'Milestones', body: 'Phase completions and achievements' },
  ]
};

// ─────────────────────────────────────────────
// SCREEN: PATIENT — CARE
// ─────────────────────────────────────────────
SCREENS['patient-care'] = () => `
  <div class="screen-full" style="background:var(--surface-base); min-height:780px;">
    ${statusBar('var(--surface-base)')}
    <div class="mobile-header">
      <div>
        <div class="header-title">Care</div>
        <div class="header-subtitle">Your care team &amp; resources</div>
      </div>
    </div>
    
    <!-- Care Team -->
    <div class="card-section">
      <div class="card-section-title">Care Team</div>
      <div class="card" style="padding:0;">
        ${[
          { initials: 'Dr', name: 'Dr. Sarah Mitchell', role: 'Allergist', avail: true },
          { initials: 'RN', name: 'Nurse Jennifer Lopez', role: 'Care Coordinator', avail: true },
          { initials: 'PA', name: 'PA Marcus Johnson', role: 'Physician Associate', avail: false },
        ].map(p => `
          <div class="list-item">
            <div class="avatar">${p.initials}</div>
            <div class="list-item-content">
              <div class="list-item-title">${p.name}</div>
              <div class="list-item-subtitle">${p.role}</div>
              <div style="font-size:11px; color:${p.avail ? 'var(--s2b-success)' : 'var(--text-muted)'}; font-weight:600; margin-top:2px;">${p.avail ? '● Available' : '○ Out of office'}</div>
            </div>
            <button class="btn btn-sm btn-secondary">Message</button>
          </div>`).join('')}
      </div>
    </div>
    
    <!-- Menu Items -->
    <div class="card-section">
      <div class="card-section-title">Quick Access</div>
      <div class="card" style="padding:0;">
        ${[
          { iconName: 'messages',    iconColor: 'var(--s2b-blue)',   bg: 'var(--s2b-blue-light)',  label: 'Messages',           sub: '2 unread',                  badge: '2' },
          { iconName: 'calendar',    iconColor: 'var(--s2b-blue)',   bg: 'var(--s2b-blue-light)',  label: 'Appointments',       sub: 'Next: Sep 15 · 10:00 AM',  badge: null },
          { iconName: 'book',        iconColor: 'var(--s2b-blue)',   bg: 'var(--s2b-blue-light)',  label: 'Educational Content',sub: 'Food allergy resources',    badge: null },
          { iconName: 'help-circle', iconColor: 'var(--s2b-blue)',   bg: 'var(--s2b-blue-light)',  label: 'Help &amp; FAQ',     sub: 'Common questions answered', badge: null },
          { iconName: 'emergency',   iconColor: 'var(--s2b-urgent)', bg: 'var(--s2b-urgent-bg)',   label: 'Emergency Help',     sub: 'Urgent care guidance',      badge: 'urgent' },
        ].map(i => `
          <div class="list-item">
            <div class="list-item-icon" style="background:${i.bg};">${icon(i.iconName, 20, i.iconColor)}</div>
            <div class="list-item-content">
              <div class="list-item-title" style="color:${i.badge === 'urgent' ? 'var(--s2b-urgent)' : 'var(--text-dark)'};">${i.label}</div>
              <div class="list-item-subtitle">${i.sub}</div>
            </div>
            ${i.badge === 'urgent' ? '<span class="status-badge urgent" style="font-size:10px;">SOS</span>' : i.badge ? `<div style="background:var(--s2b-teal);color:white;border-radius:999px;padding:2px 8px;font-size:11px;font-weight:700;">${i.badge}</div>` : '<span class="list-item-chevron">›</span>'}
          </div>`).join('')}
      </div>
    </div>
    
    <div style="padding:0 20px 100px;">
      <div class="alert-card warning">
        <div class="alert-icon">${icon('warning', 20)}</div>
        <div>
          <div class="alert-title">Emergency Help Notice</div>
          <div class="alert-body">Secure messaging is not an emergency service. For severe reactions, call 911 or use your EpiPen. Emergency guidance is provided by your care team.</div>
        </div>
      </div>
    </div>
    
    ${patientNav('care')}
  </div>`;

INFO['patient-care'] = {
  screen: 'Patient — Care',
  role: 'patient',
  desc: 'Care team connection hub. Messages, appointments, educational content, help, and emergency guidance access.',
  ia: [
    { title: 'Care Team', body: 'List of assigned providers with availability and messaging' },
    { title: 'Messages', body: 'Secure messaging with care team (unread badge)' },
    { title: 'Appointments', body: 'Upcoming clinic visits' },
    { title: 'Educational Content', body: 'Allergy education resources' },
    { title: 'Emergency Help', body: 'Care team-provided emergency guidance — clearly distinguished from normal messaging' },
  ],
  notes: 'IMPORTANT: Emergency Help must be visually distinct and include a clear disclaimer that messaging is not a 911 replacement.'
};

// ─────────────────────────────────────────────
// SCREEN: PATIENT — PROFILE
// ─────────────────────────────────────────────
SCREENS['patient-profile'] = () => `
  <div class="screen-full" style="background:var(--surface-base); min-height:780px;">
    ${statusBar('var(--surface-base)')}
    <div style="padding:20px 20px 0; background:var(--s2b-teal-light);">
      <div style="display:flex; align-items:center; gap:16px; padding-bottom:20px;">
        <div class="avatar lg" style="width:64px; height:64px; font-size:24px;">A</div>
        <div>
          <div style="font-size:18px; font-weight:800; color:var(--s2b-blue);">Alex Johnson</div>
          <div style="font-size:13px; color:var(--text-secondary);">Patient · DOB: Mar 12, 2008</div>
          <div class="status-badge completed" style="margin-top:4px; font-size:10px;">● Active Treatment</div>
        </div>
      </div>
    </div>
    
    <div class="card-section" style="margin-top:16px;">
      <div class="card-section-title">Account</div>
      <div class="card" style="padding:0;">
        ${[
          { iconName: 'user',             iconColor: 'var(--s2b-blue)', bg: 'var(--s2b-blue-light)',  label: 'Personal Information' },
          { iconName: 'phone',            iconColor: 'var(--s2b-blue)', bg: 'var(--s2b-blue-light)',  label: 'Emergency Contact' },
          { iconName: 'role-caregiver',   iconColor: 'var(--s2b-blue)', bg: 'var(--s2b-blue-light)',  label: 'Caregiver Access' },
        ].map(i => `
          <div class="list-item">
            <div class="list-item-icon" style="background:${i.bg};">${icon(i.iconName, 20, i.iconColor)}</div>
            <div class="list-item-content"><div class="list-item-title">${i.label}</div></div>
            <span class="list-item-chevron">›</span>
          </div>`).join('')}
      </div>
    </div>
    
    <div class="card-section">
      <div class="card-section-title">Preferences</div>
      <div class="card" style="padding:0;">
        ${[
          { iconName: 'bell',        iconColor: 'var(--text-secondary)', bg: 'var(--surface-base)', label: 'Notifications & Reminders' },
          { iconName: 'lock',        iconColor: 'var(--text-secondary)', bg: 'var(--surface-base)', label: 'Privacy & Security' },
          { iconName: 'settings',    iconColor: 'var(--text-secondary)', bg: 'var(--surface-base)', label: 'Account Settings' },
          { iconName: 'help-circle', iconColor: 'var(--text-secondary)', bg: 'var(--surface-base)', label: 'Support' },
        ].map(i => `
          <div class="list-item">
            <div class="list-item-icon" style="background:${i.bg};">${icon(i.iconName, 20, i.iconColor)}</div>
            <div class="list-item-content"><div class="list-item-title">${i.label}</div></div>
            <span class="list-item-chevron">›</span>
          </div>`).join('')}
      </div>
    </div>
    
    <div style="padding:8px 20px 100px;">
      <button class="btn btn-text" style="color:var(--s2b-urgent); width:100%;" id="signout-btn">Sign Out</button>
    </div>
    
    ${patientNav('profile')}
  </div>`;

INFO['patient-profile'] = {
  screen: 'Patient — Profile',
  role: 'patient',
  desc: 'Patient account management — personal info, emergency contacts, caregiver access, notifications, privacy, and settings.',
  ia: [
    { title: 'Personal Information', body: 'Name, DOB, contact, allergies' },
    { title: 'Emergency Contact', body: 'Who to contact in emergencies' },
    { title: 'Caregiver Access', body: 'Authorize a caregiver to view/manage profile' },
    { title: 'Notifications', body: 'Dose reminders, assessment alerts, messages' },
    { title: 'Privacy & Security', body: 'Biometrics, password, data privacy' },
    { title: 'Account Settings', body: 'App preferences' },
    { title: 'Support', body: 'Help center and contact' },
  ]
};

// ─────────────────────────────────────────────
// SCREEN: CAREGIVER — HOME (My Patients)
// ─────────────────────────────────────────────
SCREENS['caregiver-home'] = () => `
  <div class="screen-full" style="background:var(--surface-base); min-height:780px;">
    ${statusBar('var(--surface-base)')}
    <div class="mobile-header">
      <div>
        <div class="header-title">My Family</div>
        <div class="header-subtitle">Select a patient to manage</div>
      </div>
      <div class="avatar" style="background:linear-gradient(135deg,#7c3aed,#4f46e5);">MJ</div>
    </div>
    
    <div style="padding:4px 20px 16px;">
      <div class="alert-card attention" style="margin-bottom:0;">
        <div class="alert-icon">${icon('clipboard', 20)}</div>
        <div>
          <div class="alert-title">John has a pending assessment</div>
          <div class="alert-body">Today's health check-in is due. Please complete it for John.</div>
        </div>
      </div>
    </div>
    
    <div class="card-section">
      <div class="card-section-title">My Patients</div>
      <div style="display:flex; flex-direction:column; gap:14px;">
        
        <!-- Patient 1: John -->
        <div onclick="showScreen('caregiver-selected')" style="background:white; border-radius:var(--radius-xl); border:2px solid var(--border-light); padding:18px; cursor:pointer; box-shadow:var(--shadow-card);" id="patient-john-card">
          <div style="display:flex; align-items:flex-start; gap:14px;">
            <div class="avatar lg" style="background:linear-gradient(135deg,var(--s2b-teal),var(--s2b-blue));">J</div>
            <div style="flex:1;">
              <div style="display:flex; align-items:center; gap:8px; margin-bottom:4px;">
                <div style="font-size:17px; font-weight:800; color:var(--s2b-blue);">John</div>
                <div style="font-size:12px; color:var(--text-secondary);">Age 8</div>
              </div>
              <div style="font-size:12px; color:var(--text-secondary); margin-bottom:10px;">Peanut OIT · Phase 2 · Week 6</div>
              <div style="display:flex; gap:8px; flex-wrap:wrap;">
                <span class="status-badge attention" style="display:inline-flex;align-items:center;gap:3px;">${icon('clipboard',12,'var(--s2b-attention)',2)} Assessment Due</span>
                <span class="status-badge completed" style="display:inline-flex;align-items:center;gap:3px;">${icon('treatment',12,'var(--s2b-success)',2)} 5mg Today</span>
              </div>
            </div>
            <div style="color:var(--text-muted); display:flex; align-items:center;">${icon('chevron', 18, 'var(--text-muted)', 2)}</div>
          </div>
          <div style="margin-top:14px;">
            <div style="display:flex; justify-content:space-between; margin-bottom:4px;">
              <div style="font-size:11px; color:var(--text-secondary);">Treatment Progress</div>
              <div style="font-size:11px; font-weight:700; color:var(--s2b-teal);">62%</div>
            </div>
            <div class="progress-bar-wrap"><div class="progress-bar-fill" style="width:62%;"></div></div>
          </div>
        </div>
        
        <!-- Patient 2: Sarah -->
        <div style="background:white; border-radius:var(--radius-xl); border:2px solid var(--border-light); padding:18px; cursor:pointer; box-shadow:var(--shadow-card);" id="patient-sarah-card">
          <div style="display:flex; align-items:flex-start; gap:14px;">
            <div class="avatar lg" style="background:linear-gradient(135deg,#f472b6,#a855f7);">S</div>
            <div style="flex:1;">
              <div style="display:flex; align-items:center; gap:8px; margin-bottom:4px;">
                <div style="font-size:17px; font-weight:800; color:var(--s2b-blue);">Sarah</div>
                <div style="font-size:12px; color:var(--text-secondary);">Age 5</div>
              </div>
              <div style="font-size:12px; color:var(--text-secondary); margin-bottom:10px;">Tree Nut OIT · Phase 1 · Week 3</div>
              <div style="display:flex; gap:8px; flex-wrap:wrap;">
                <span class="status-badge completed">✓ All Tasks Done</span>
              </div>
            </div>
            <div style="color:var(--text-muted); display:flex; align-items:center;">${icon('chevron', 18, 'var(--text-muted)', 2)}</div>
          </div>
          <div style="margin-top:14px;">
            <div style="display:flex; justify-content:space-between; margin-bottom:4px;">
              <div style="font-size:11px; color:var(--text-secondary);">Treatment Progress</div>
              <div style="font-size:11px; font-weight:700; color:var(--s2b-teal);">30%</div>
            </div>
            <div class="progress-bar-wrap"><div class="progress-bar-fill" style="width:30%;"></div></div>
          </div>
        </div>
      </div>
    </div>
    
    <div style="padding:16px 20px 100px;">
      <button class="btn btn-secondary" style="width:100%;" id="add-patient-btn">+ Add Authorized Patient</button>
    </div>
    
    <nav class="mobile-bottom-nav" role="navigation" aria-label="Caregiver Navigation">
      <div class="bottom-nav-item active">
        <div class="bottom-nav-icon">${icon('role-caregiver', 22)}</div>
        <div class="bottom-nav-label">My Family</div>
        <div class="bottom-nav-dot"></div>
      </div>
      <div class="bottom-nav-item" onclick="showScreen('patient-care')">
        <div class="bottom-nav-icon">${icon('messages', 22)}</div>
        <div class="bottom-nav-label">Messages</div>
      </div>
      <div class="bottom-nav-item">
        <div class="bottom-nav-icon">${icon('alerts', 22)}</div>
        <div class="bottom-nav-label">Alerts</div>
      </div>
      <div class="bottom-nav-item" onclick="showScreen('patient-profile')">
        <div class="bottom-nav-icon">${icon('profile', 22)}</div>
        <div class="bottom-nav-label">Profile</div>
      </div>
    </nav>
  </div>`;

INFO['caregiver-home'] = {
  screen: 'Caregiver — My Family',
  role: 'caregiver',
  desc: 'Caregiver home screen. Shows all authorized patients with their current status at a glance. Tapping a patient switches the full experience to that patient\'s view.',
  ia: [
    { title: 'Alert Banner', body: 'Urgent items across any authorized patient' },
    { title: 'Patient Cards', body: 'Name, age, protocol, progress, today\'s status' },
    { title: 'Progress Bar', body: 'Per-patient treatment completion' },
    { title: 'Add Patient', body: 'Request access to additional authorized patients' },
  ],
  notes: 'CRITICAL: Always display the selected patient\'s name clearly when in their sub-screens to prevent accidental data entry for the wrong person.'
};

// ─────────────────────────────────────────────
// SCREEN: CAREGIVER — PATIENT SELECTED
// ─────────────────────────────────────────────
SCREENS['caregiver-selected'] = () => `
  <div class="screen-full" style="background:var(--surface-base); min-height:780px;">
    ${statusBar('var(--s2b-teal-light)')}
    <!-- Active Patient Banner -->
    <div style="background:var(--s2b-blue); padding:12px 20px 14px; display:flex; align-items:center; justify-content:space-between;">
      <div style="display:flex; align-items:center; gap:10px;">
        <button onclick="showScreen('caregiver-home')" style="background:rgba(255,255,255,0.15); border:none; border-radius:999px; color:white; padding:4px 10px; font-size:12px; cursor:pointer;">← Back</button>
        <div class="patient-chip" style="background:rgba(255,255,255,0.15);">
          <div class="avatar" style="width:28px; height:28px; font-size:11px; background:var(--s2b-teal);">J</div>
          <span style="color:white; font-size:13px; font-weight:700;">Viewing: John, Age 8</span>
        </div>
      </div>
      <div style="font-size:11px; color:rgba(255,255,255,0.7); font-weight:600;">CAREGIVER VIEW</div>
    </div>
    
    <div class="greeting-header" style="padding-top:16px;">
      <div class="greeting-time">Tuesday, September 8 · John's Care</div>
      <div class="greeting-text" style="display:flex;align-items:center;gap:8px;">John's Today ${icon('clipboard', 22, 'var(--s2b-blue)')}</div>
      <div class="greeting-sub">As caregiver for John, age 8</div>
    </div>
    
    <div style="padding:0 20px 12px;">
      <div class="alert-card attention">
        <div class="alert-icon">${icon('clipboard', 20)}</div>
        <div>
          <div class="alert-title">Assessment Due for John</div>
          <div class="alert-body">Complete John's daily health check-in. This information will be shared with his care team.</div>
        </div>
      </div>
    </div>
    
    <div style="padding:0 20px 16px;">
      <div class="dose-card">
        <div class="dose-card-label">John's Dose Today</div>
        <div class="dose-card-value">5 <span class="dose-card-unit">mg</span></div>
        <div class="dose-card-meta" style="display:flex;align-items:center;gap:5px;">${icon('today', 14, 'var(--s2b-teal)')} After breakfast · 8:00 AM</div>
        <div class="dose-card-actions">
          <button class="dose-card-btn primary" id="john-dose-confirm">✓ John Took His Dose</button>
          <button class="dose-card-btn secondary" id="john-dose-missed">He Didn't Take It</button>
        </div>
      </div>
    </div>
    
    <div style="padding:0 20px 24px;">
      <div class="alert-card warning">
        <div class="alert-icon">${icon('warning', 20)}</div>
        <div>
          <div class="alert-title">You Are Recording for John</div>
          <div class="alert-body">All data entered here will be saved under John's profile. Ensure you have selected the correct patient before submitting.</div>
        </div>
      </div>
    </div>
    
    <div style="padding-bottom:80px;"></div>
    
    <nav class="mobile-bottom-nav" role="navigation" aria-label="Caregiver Patient Navigation">
      <div class="bottom-nav-item active">
        <div class="bottom-nav-icon">${icon('today', 22)}</div>
        <div class="bottom-nav-label">John Today</div>
        <div class="bottom-nav-dot"></div>
      </div>
      <div class="bottom-nav-item">
        <div class="bottom-nav-icon">${icon('treatment', 22)}</div>
        <div class="bottom-nav-label">Treatment</div>
      </div>
      <div class="bottom-nav-item">
        <div class="bottom-nav-icon">${icon('progress', 22)}</div>
        <div class="bottom-nav-label">Progress</div>
      </div>
      <div class="bottom-nav-item">
        <div class="bottom-nav-icon">${icon('care', 22)}</div>
        <div class="bottom-nav-label">Care</div>
      </div>
      <div class="bottom-nav-item" onclick="showScreen('caregiver-home')">
        <div class="bottom-nav-icon">${icon('role-caregiver', 22)}</div>
        <div class="bottom-nav-label">Family</div>
      </div>
    </nav>
  </div>`;

INFO['caregiver-selected'] = {
  screen: 'Caregiver — Patient Selected (John)',
  role: 'caregiver',
  desc: 'Once a caregiver selects a patient, the full Today/Treatment/Progress/Care experience loads for that patient. A persistent banner always shows whose data is being viewed.',
  ia: [
    { title: 'Active Patient Banner', body: 'Always shows who you are currently managing — prevents wrong patient data entry' },
    { title: 'Back Navigation', body: 'Returns to My Family without losing context' },
    { title: 'Warning Banner', body: 'Confirms the caregiver is recording for the correct patient' },
    { title: "Patient's Today", body: 'Same structure as Patient Today screen, contextualized for the child' },
  ],
  notes: 'The patient identity banner must be persistent and impossible to miss throughout the caregiver patient experience.'
};

// ─────────────────────────────────────────────
// SCREEN: DOCTOR — DASHBOARD
// ─────────────────────────────────────────────
SCREENS['doctor-dashboard'] = () => `
  <div class="screen-full" style="background:var(--surface-base); min-height:780px;">
    ${statusBar('var(--surface-base)')}
    <div class="mobile-header">
      <div>
        <div style="font-size:12px; font-weight:600; color:var(--s2b-teal); letter-spacing:0.06em; text-transform:uppercase; margin-bottom:2px;">Dr. Sarah Mitchell</div>
        <div class="header-title">Dashboard</div>
        <div class="header-subtitle">Tue, September 8 · 9:41 AM</div>
      </div>
      <div class="header-icon-btn" style="position:relative; width:36px; height:36px; border-radius:var(--radius-md);">${icon('bell', 20, 'var(--s2b-blue)')}
        <div style="position:absolute; top:6px; right:6px; width:8px; height:8px; background:var(--s2b-urgent); border-radius:50%; border:2px solid white;"></div>
      </div>
    </div>
    
    <!-- Alert Summary -->
    <div style="padding:0 20px 14px;">
      <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px;">
        <div onclick="showScreen('doctor-alerts')" style="background:var(--s2b-critical-bg); border:1px solid #e57373; border-radius:var(--radius-lg); padding:14px; cursor:pointer; text-align:center;" id="critical-alert-card">
          <div style="font-size:24px; font-weight:800; color:var(--s2b-critical);">2</div>
          <div style="font-size:10px; font-weight:700; color:var(--s2b-critical); text-transform:uppercase; letter-spacing:0.05em; display:flex; align-items:center; justify-content:center; gap:3px;">${icon('x-circle', 12, 'var(--s2b-critical)', 2)} Critical</div>
        </div>
        <div onclick="showScreen('doctor-alerts')" style="background:var(--s2b-urgent-bg); border:1px solid #ef9a9a; border-radius:var(--radius-lg); padding:14px; cursor:pointer; text-align:center;" id="urgent-alert-card">
          <div style="font-size:24px; font-weight:800; color:var(--s2b-urgent);">5</div>
          <div style="font-size:10px; font-weight:700; color:var(--s2b-urgent); text-transform:uppercase; letter-spacing:0.05em; display:flex; align-items:center; justify-content:center; gap:3px;">${icon('alert-circle', 12, 'var(--s2b-urgent)', 2)} Urgent</div>
        </div>
      </div>
    </div>
    
    <!-- Assessments to Review -->
    <div class="section-header-row">
      <div class="section-header-title">Assessments to Review</div>
      <div class="section-header-link" style="background:var(--s2b-attention-bg); color:var(--s2b-attention); padding:3px 10px; border-radius:999px; font-size:11px;">12 Pending</div>
    </div>
    <div style="padding:0 20px 14px;">
      <div class="card" style="padding:0;">
        ${[
          { name: 'Alex Johnson', age: 8, proto: 'Peanut OIT', note: 'Reported mild itching after dose', priority: 'urgent' },
          { name: 'Emma Davis', age: 12, proto: 'Tree Nut OIT', note: 'Assessment submitted 30 min ago', priority: 'attention' },
          { name: 'Marcus Lee', age: 6, proto: 'Milk OIT', note: 'Routine daily check-in', priority: 'normal' },
        ].map(p => `
          <div class="list-item" onclick="showScreen('doctor-patient-profile')" style="cursor:pointer;">
            <div class="avatar">${p.name.split(' ').map(n=>n[0]).join('')}</div>
            <div class="list-item-content">
              <div style="display:flex; align-items:center; gap:6px;">
                <div class="list-item-title">${p.name}</div>
                <div style="font-size:11px; color:var(--text-muted);">Age ${p.age}</div>
              </div>
              <div class="list-item-subtitle">${p.proto} · ${p.note}</div>
            </div>
            <span class="priority-pill ${p.priority}">${p.priority === 'urgent' ? icon('alert-circle',12,'var(--s2b-urgent)',2) : p.priority === 'normal' ? icon('check-circle',12,'var(--s2b-success)',2) : '!'}</span>
          </div>`).join('')}
      </div>
    </div>
    
    <!-- Patients Needing Attention -->
    <div class="section-header-row">
      <div class="section-header-title">Requiring Attention</div>
      <div class="section-header-link" onclick="showScreen('doctor-patients')">All Patients</div>
    </div>
    <div style="padding:0 20px 14px;">
      <div class="card" style="padding:0;">
        <div class="list-item" onclick="showScreen('doctor-patient-profile')" style="cursor:pointer;">
          <div class="avatar" style="background:linear-gradient(135deg,var(--s2b-urgent),#c0392b);">RK</div>
          <div class="list-item-content">
            <div class="list-item-title">Riley Kim</div>
            <div class="list-item-subtitle">Missed 3 consecutive doses · Peanut OIT</div>
          </div>
          <span class="priority-pill urgent" style="display:inline-flex;align-items:center;gap:3px;">${icon('alert-circle',11,'var(--s2b-urgent)',2)} Urgent</span>
        </div>
        <div class="list-item" onclick="showScreen('doctor-patient-profile')" style="cursor:pointer;">
          <div class="avatar" style="background:linear-gradient(135deg,var(--s2b-attention),#d4640c);">TP</div>
          <div class="list-item-content">
            <div class="list-item-title">Tyler Park</div>
            <div class="list-item-subtitle">Reaction reported · Awaiting follow-up</div>
          </div>
          <span class="priority-pill warning">! Follow-up</span>
        </div>
      </div>
    </div>
    
    <!-- Recent Messages -->
    <div class="section-header-row">
      <div class="section-header-title">Recent Messages</div>
      <div class="section-header-link" onclick="showScreen('doctor-messages')">View All</div>
    </div>
    <div style="padding:0 20px 100px;">
      <div class="card" style="padding:0;">
        <div class="list-item" onclick="showScreen('doctor-messages')" style="cursor:pointer;">
          <div class="avatar" style="font-size:12px;">AJ</div>
          <div class="list-item-content">
            <div class="list-item-title">Alex Johnson</div>
            <div class="list-item-subtitle">Is it normal to feel slightly itchy 1 hour after...</div>
          </div>
          <div style="font-size:10px; color:var(--text-muted);">2m ago</div>
        </div>
        <div class="list-item" onclick="showScreen('doctor-messages')" style="cursor:pointer;">
          <div class="avatar" style="font-size:12px;">ED</div>
          <div class="list-item-content">
            <div class="list-item-title">Emma Davis</div>
            <div class="list-item-subtitle">Thank you for the updated instructions!</div>
          </div>
          <div style="font-size:10px; color:var(--text-muted);">1h ago</div>
        </div>
      </div>
    </div>
    
    ${doctorNav('dashboard')}
  </div>`;

INFO['doctor-dashboard'] = {
  screen: 'Doctor — Dashboard',
  role: 'doctor',
  desc: 'Doctor home screen. Immediately surfaces critical/urgent alerts, assessments to review, patients needing attention, and recent messages.',
  ia: [
    { title: 'Alert Summary Cards', body: 'Critical and Urgent count with tap-to-navigate' },
    { title: 'Assessments to Review', body: 'Pending patient assessments with priority levels' },
    { title: 'Requiring Attention', body: 'Patients with missed doses, reactions, or flagged items' },
    { title: 'Recent Messages', body: 'Latest patient messages' },
  ],
  notes: 'Core Doctor UX: Which patients need attention? Are there urgent alerts? What changed recently? All answered immediately on this screen.'
};

// ─────────────────────────────────────────────
// SCREEN: DOCTOR — PATIENTS
// ─────────────────────────────────────────────
SCREENS['doctor-patients'] = () => `
  <div class="screen-full" style="background:var(--surface-base); min-height:780px;">
    ${statusBar('var(--surface-base)')}
    <div class="mobile-header">
      <div class="header-title">Patients</div>
    </div>
    
    <!-- Search -->
    <div style="padding:0 20px 12px;">
      <div style="position:relative;">
        <div style="position:absolute; left:12px; top:50%; transform:translateY(-50%); pointer-events:none;">${icon('search', 16, 'var(--text-muted)')}</div>
        <input class="input-field" type="search" placeholder="Search patients..." id="patient-search" aria-label="Search patients" style="padding-left:38px;"/>
      </div>
    </div>
    
    <!-- Filters -->
    <div style="padding:0 20px 14px; display:flex; gap:8px; overflow-x:auto; scrollbar-width:none;">
      ${['All (48)', 'Attention', 'Missed Dose', 'Reaction', 'Phase 1', 'Phase 2'].map((f,i) => 
        `<div style="background:${i===0?'var(--s2b-blue)':'white'}; color:${i===0?'white':'var(--text-secondary)'}; border:1px solid ${i===0?'var(--s2b-blue)':'var(--border-light)'}; border-radius:999px; padding:6px 14px; font-size:12px; font-weight:600; white-space:nowrap; cursor:pointer;">${f}</div>`
      ).join('')}
    </div>
    
    <!-- Patient List -->
    <div class="card-section" style="margin-top:0;">
      <div class="card" style="padding:0;">
        ${[
          { name: 'Alex Johnson', age: 8, proto: 'Peanut OIT', phase: 'Phase 2', priority: 'urgent', note: 'Reaction reported' },
          { name: 'Emma Davis', age: 12, proto: 'Tree Nut OIT', phase: 'Phase 2', priority: 'attention', note: 'Assessment pending' },
          { name: 'Riley Kim', age: 10, proto: 'Peanut OIT', phase: 'Phase 1', priority: 'urgent', note: 'Missed 3 doses' },
          { name: 'Marcus Lee', age: 6, proto: 'Milk OIT', phase: 'Phase 1', priority: 'normal', note: 'On track' },
          { name: 'Sofia Garcia', age: 14, proto: 'Egg OIT', phase: 'Phase 3', priority: 'normal', note: 'Maintenance phase' },
          { name: 'Tyler Park', age: 9, proto: 'Peanut OIT', phase: 'Phase 2', priority: 'warning', note: 'Follow-up needed' },
        ].map(p => `
          <div class="list-item" onclick="showScreen('doctor-patient-profile')" style="cursor:pointer;">
            <div class="avatar" style="background:linear-gradient(135deg,var(--s2b-teal),var(--s2b-blue));">${p.name.split(' ').map(n=>n[0]).join('')}</div>
            <div class="list-item-content">
              <div style="display:flex; align-items:center; gap:6px;">
                <div class="list-item-title">${p.name}</div>
                <div style="font-size:11px; color:var(--text-muted);">Age ${p.age}</div>
              </div>
              <div class="list-item-subtitle">${p.proto} · ${p.phase} · ${p.note}</div>
            </div>
            <span class="priority-pill ${p.priority}">${p.priority === 'urgent' ? icon('alert-circle',11,'var(--s2b-urgent)',2) : p.priority === 'warning' ? icon('warning',11,'var(--s2b-warning)',2) : p.priority === 'attention' ? icon('info',11,'var(--s2b-attention)',2) : icon('check-circle',11,'var(--s2b-success)',2)}</span>
          </div>`).join('')}
      </div>
    </div>
    
    <div style="padding-bottom:80px;"></div>
    ${doctorNav('patients')}
  </div>`;

INFO['doctor-patients'] = {
  screen: 'Doctor — Patients',
  role: 'doctor',
  desc: 'Full patient list with search, filters, and priority indicators. Quick access to any patient profile.',
  ia: [
    { title: 'Search', body: 'Search by patient name, DOB, or protocol' },
    { title: 'Filters', body: 'All, Attention, Missed Dose, Reaction, Phase filters' },
    { title: 'Patient List', body: 'Name, age, protocol, phase, status, priority badge' },
  ]
};

// ─────────────────────────────────────────────
// SCREEN: DOCTOR — PATIENT PROFILE
// ─────────────────────────────────────────────
SCREENS['doctor-patient-profile'] = () => `
  <div class="screen-full" style="background:var(--surface-base); min-height:780px;">
    ${statusBar('var(--s2b-blue)')}
    <!-- Patient Header -->
    <div style="background:linear-gradient(135deg,var(--s2b-blue),var(--s2b-blue-mid)); padding:12px 20px 20px; color:white;">
      <button onclick="showScreen('doctor-patients')" style="background:rgba(255,255,255,0.15); border:none; border-radius:999px; color:white; padding:5px 12px; font-size:12px; cursor:pointer; margin-bottom:16px;">← All Patients</button>
      <div style="display:flex; align-items:center; gap:16px; margin-bottom:16px;">
        <div class="avatar lg" style="width:60px; height:60px; font-size:22px; background:rgba(255,255,255,0.2); border:2px solid rgba(255,255,255,0.3);">AJ</div>
        <div>
          <div style="font-size:20px; font-weight:800;">Alex Johnson</div>
          <div style="font-size:13px; opacity:0.8;">Age 8 · DOB: Mar 12, 2018</div>
          <div style="font-size:12px; opacity:0.7; margin-top:2px;">Peanut OIT · MRN: S2B-002847</div>
        </div>
      </div>
      <div style="display:grid; grid-template-columns:repeat(3,1fr); gap:10px;">
        <div style="background:rgba(255,255,255,0.12); border-radius:var(--radius-md); padding:10px; text-align:center;">
          <div style="font-size:18px; font-weight:800;">5mg</div>
          <div style="font-size:10px; opacity:0.7; font-weight:600; text-transform:uppercase;">Current Dose</div>
        </div>
        <div style="background:rgba(255,255,255,0.12); border-radius:var(--radius-md); padding:10px; text-align:center;">
          <div style="font-size:18px; font-weight:800;">Phase 2</div>
          <div style="font-size:10px; opacity:0.7; font-weight:600; text-transform:uppercase;">Treatment</div>
        </div>
        <div style="background:rgba(255,255,255,0.12); border-radius:var(--radius-md); padding:10px; text-align:center;">
          <div style="font-size:18px; font-weight:800;">94%</div>
          <div style="font-size:10px; opacity:0.7; font-weight:600; text-transform:uppercase;">Adherence</div>
        </div>
      </div>
    </div>
    
    <!-- Status Alert -->
    <div style="padding:12px 20px 0;">
      <div class="alert-card urgent">
        <div class="alert-icon">${icon('alert-circle', 20)}</div>
        <div>
          <div class="alert-title">Reaction Reported Today</div>
          <div class="alert-body">Alex reported mild itching 1 hour post-dose. Assessment submitted 2:15 PM. Awaiting clinical review.</div>
        </div>
      </div>
    </div>
    
    <!-- Profile Section List -->
    <div class="card-section" style="margin-top:14px;">
      <div class="card-section-title">Clinical Record</div>
      <div class="card" style="padding:0;">
        ${[
          { iconName: 'assessment',  iconColor: 'var(--s2b-urgent)',    bg: 'var(--s2b-urgent-bg)',    label: "Today's Status",   sub: 'Assessment submitted · Reaction flagged', badge: 'urgent' },
          { iconName: 'treatment',   iconColor: 'var(--s2b-blue)',     bg: 'var(--s2b-blue-light)',   label: 'Treatment Plan',  sub: 'Peanut OIT · Phase 2 · Dose Buildup',    badge: null },
          { iconName: 'clipboard',   iconColor: 'var(--s2b-attention)',bg: 'var(--s2b-attention-bg)', label: 'Assessments',     sub: '38 completed · 1 pending review',         badge: 'attention' },
          { iconName: 'activity',    iconColor: 'var(--s2b-warning)',  bg: 'var(--s2b-warning-bg)',   label: 'Reactions',       sub: '2 mild reactions logged',                 badge: 'warning' },
          { iconName: 'illness',     iconColor: 'var(--text-secondary)',bg:'var(--surface-base)',      label: 'Illness Reports', sub: 'No recent illness',                       badge: null },
          { iconName: 'food',        iconColor: 'var(--s2b-teal)',     bg: 'var(--s2b-teal-light)',   label: 'Food Intake Log', sub: "Today's food diary submitted",             badge: null },
          { iconName: 'timeline',    iconColor: 'var(--s2b-blue)',     bg: 'var(--s2b-blue-light)',   label: 'Patient Timeline',sub: 'Full chronological view',                  badge: null },
          { iconName: 'alerts',      iconColor: 'var(--s2b-urgent)',   bg: 'var(--s2b-urgent-bg)',    label: 'Alerts',          sub: '1 active urgent alert',                   badge: 'urgent' },
          { iconName: 'note',        iconColor: 'var(--s2b-blue)',     bg: 'var(--s2b-blue-light)',   label: 'Clinical Notes',  sub: 'Last note: 3 days ago',                    badge: null },
        ].map(i => `
          <div class="list-item">
            <div class="list-item-icon" style="background:${i.bg};">${icon(i.iconName, 20, i.iconColor)}</div>
            <div class="list-item-content">
              <div class="list-item-title">${i.label}</div>
              <div class="list-item-subtitle">${i.sub}</div>
            </div>
            ${i.badge ? `<span class="priority-pill ${i.badge}">!</span>` : '<span class="list-item-chevron">›</span>'}
          </div>`).join('')}
      </div>
    </div>
    
    <div style="padding:0 20px 100px; display:flex; flex-direction:column; gap:10px;">
      <button class="btn btn-primary" id="message-patient-btn" style="display:flex;align-items:center;justify-content:center;gap:8px;">${icon('messages', 18, 'white')} Message Alex</button>
      <button class="btn btn-secondary" id="acknowledge-alert-btn">✓ Acknowledge Alert</button>
    </div>
    
    ${doctorNav('patients')}
  </div>`;

INFO['doctor-patient-profile'] = {
  screen: 'Doctor — Patient Profile',
  role: 'doctor',
  desc: 'Full clinical patient profile. Central hub for reviewing patient status, assessments, reactions, illness, treatment, and communication.',
  ia: [
    { title: 'Patient Header', body: 'Name, age, DOB, MRN, current dose, phase, adherence' },
    { title: 'Status Alert', body: 'Most critical current alert prominently displayed' },
    { title: "Today's Status", body: 'Daily assessment result + any flagged items' },
    { title: 'Treatment Plan', body: 'Protocol, phase, current and upcoming doses' },
    { title: 'Assessments', body: 'All submitted assessments with pending review flag' },
    { title: 'Reactions', body: 'Reaction log with severity' },
    { title: 'Clinical Notes', body: 'Doctor-authored clinical notes' },
    { title: 'Message Patient', body: 'Initiate secure message to patient/caregiver' },
    { title: 'Acknowledge Alert', body: 'Mark alert as reviewed by clinician' },
  ]
};

// ─────────────────────────────────────────────
// SCREEN: DOCTOR — ALERTS
// ─────────────────────────────────────────────
SCREENS['doctor-alerts'] = () => `
  <div class="screen-full" style="background:var(--surface-base); min-height:780px;">
    ${statusBar('var(--surface-base)')}
    <div class="mobile-header">
      <div class="header-title">Alerts</div>
      <div style="display:flex; gap:8px;">
        <div class="header-icon-btn" style="font-size:14px; width:auto; padding:0 12px; border-radius:999px; font-weight:600; color:var(--text-secondary);">Filter</div>
      </div>
    </div>
    
    <!-- Alert Tabs -->
    <div style="padding:0 20px 14px; display:flex; gap:8px;">
      ${[
        { label: 'Critical',   iconName: 'x-circle',     count: '2', color: 'var(--s2b-critical)', bg: 'var(--s2b-critical-bg)' },
        { label: 'Urgent',     iconName: 'alert-circle',  count: '5', color: 'var(--s2b-urgent)',   bg: 'var(--s2b-urgent-bg)' },
        { label: 'Attention',  iconName: 'clipboard',     count: '9', color: 'var(--s2b-attention)',bg: 'var(--s2b-attention-bg)' },
      ].map((t,i) => `
        <div style="flex:1; background:${i===0?t.bg:'white'}; border:1px solid ${i===0?t.color:'var(--border-light)'}; border-radius:var(--radius-lg); padding:10px 8px; text-align:center; cursor:pointer;">
          <div style="font-size:16px; font-weight:800; color:${t.color};">${t.count}</div>
          <div style="font-size:10px; font-weight:700; color:${t.color}; display:flex; align-items:center; justify-content:center; gap:3px;">${icon(t.iconName, 11, t.color, 2)} ${t.label}</div>
        </div>`).join('')}
    </div>
    
    <!-- Critical Alerts -->
    <div class="card-section">
      <div class="card-section-title" style="color:var(--s2b-critical); display:flex; align-items:center; gap:6px;">${icon('x-circle', 15, 'var(--s2b-critical)', 2)} Critical Alerts</div>
      <div style="display:flex; flex-direction:column; gap:10px;">
        <div class="alert-card critical" onclick="showScreen('doctor-patient-profile')" style="cursor:pointer;">
          <div class="alert-icon">${icon('x-circle', 20)}</div>
          <div style="flex:1;">
            <div style="display:flex; justify-content:space-between; align-items:flex-start;">
              <div class="alert-title">Severe Reaction — Riley Kim</div>
              <div style="font-size:10px; color:var(--s2b-critical); font-weight:700;">2m ago</div>
            </div>
            <div class="alert-body">Patient reported throat tightness and difficulty swallowing 45 minutes post-dose. EpiPen administered. Caregiver contacted 911.</div>
            <div style="margin-top:8px; display:flex; gap:8px;">
              <button class="btn btn-sm" style="background:var(--s2b-critical); color:white; padding:6px 14px; font-size:11px;" id="view-riley-btn">View Patient</button>
              <button class="btn btn-sm btn-secondary" style="border-color:var(--s2b-critical); color:var(--s2b-critical); padding:6px 14px; font-size:11px;" id="ack-riley-btn">Acknowledge</button>
            </div>
          </div>
        </div>
        
        <div class="alert-card critical" onclick="showScreen('doctor-patient-profile')" style="cursor:pointer;">
          <div class="alert-icon">${icon('x-circle', 20)}</div>
          <div style="flex:1;">
            <div style="display:flex; justify-content:space-between; align-items:flex-start;">
              <div class="alert-title">Emergency Contact Required — Sam Torres</div>
              <div style="font-size:10px; color:var(--s2b-critical); font-weight:700;">18m ago</div>
            </div>
            <div class="alert-body">3 consecutive missed doses. Attempted system contact. No response from patient or caregiver. Requires clinical follow-up.</div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Urgent Alerts -->
    <div class="card-section">
      <div class="card-section-title" style="color:var(--s2b-urgent); display:flex; align-items:center; gap:6px;">${icon('alert-circle', 15, 'var(--s2b-urgent)', 2)} Urgent Alerts</div>
      <div class="card" style="padding:0;">
        ${[
          { name: 'Alex Johnson', issue: 'Mild reaction reported — itching after dose', time: '2h ago' },
          { name: 'Tyler Park', issue: 'Assessment response requires follow-up', time: '4h ago' },
          { name: 'Emma Davis', issue: 'Dose increase due — awaiting confirmation', time: '6h ago' },
        ].map(a => `
          <div class="list-item" onclick="showScreen('doctor-patient-profile')" style="cursor:pointer;">
            <div class="avatar" style="background:linear-gradient(135deg,var(--s2b-urgent),#e74c3c); font-size:12px;">${a.name.split(' ').map(n=>n[0]).join('')}</div>
            <div class="list-item-content">
              <div class="list-item-title">${a.name}</div>
              <div class="list-item-subtitle">${a.issue}</div>
            </div>
            <div style="font-size:10px; color:var(--text-muted);">${a.time}</div>
          </div>`).join('')}
      </div>
    </div>
    
    <div style="padding-bottom:80px;"></div>
    ${doctorNav('alerts')}
  </div>`;

INFO['doctor-alerts'] = {
  screen: 'Doctor — Alerts',
  role: 'doctor',
  desc: 'Triage-style alert center. Critical alerts at top, then urgent, then attention. All alerts link to relevant patient profile.',
  ia: [
    { title: 'Alert Tabs', body: 'Critical / Urgent / Attention with live counts' },
    { title: 'Critical Cards', body: 'Full context with immediate action buttons' },
    { title: 'Urgent List', body: 'Condensed list with patient name and issue' },
    { title: 'Acknowledge', body: 'Mark alert as reviewed by clinician' },
  ],
  notes: 'Critical alerts must be visually unmistakable. Consider vibration/sound in the real app for critical alerts.'
};

// ─────────────────────────────────────────────
// SCREEN: DOCTOR — MESSAGES
// ─────────────────────────────────────────────
SCREENS['doctor-messages'] = () => `
  <div class="screen-full" style="background:var(--surface-base); min-height:780px;">
    ${statusBar('var(--surface-base)')}
    <div class="mobile-header">
      <div class="header-title">Messages</div>
      <div class="header-icon-btn">✏️</div>
    </div>
    
    <div style="padding:0 20px 12px;">
      <input class="input-field" type="search" placeholder="🔍  Search conversations..." id="message-search" aria-label="Search messages" />
    </div>
    
    <div class="card" style="margin:0 20px 14px; padding:0; border-radius:var(--radius-lg);">
      ${[
        { name: 'Alex Johnson', msg: 'Is it normal to feel slightly itchy 1 hour after...', time: '2m', unread: 1, priority: 'urgent' },
        { name: 'Emma Davis', msg: 'Thank you for the updated dose instructions!', time: '1h', unread: 0, priority: null },
        { name: 'Riley Kim (Parent)', msg: 'She had a reaction tonight, I gave her the...', time: '2h', unread: 2, priority: 'critical' },
        { name: 'Marcus Lee', msg: 'Week 3 going great! No issues to report.', time: '3h', unread: 0, priority: null },
        { name: 'Sofia Garcia', msg: 'Question about upcoming maintenance phase', time: '1d', unread: 0, priority: null },
      ].map(m => `
        <div class="list-item" style="cursor:pointer;">
          <div class="avatar" style="background:${m.priority === 'critical' ? 'linear-gradient(135deg,var(--s2b-critical),#c62828)' : m.priority === 'urgent' ? 'linear-gradient(135deg,var(--s2b-urgent),#c0392b)' : 'linear-gradient(135deg,var(--s2b-teal),var(--s2b-blue))'}; font-size:12px;">${m.name.split(' ').map(n=>n[0]).join('').substring(0,2)}</div>
          <div class="list-item-content">
            <div style="display:flex; justify-content:space-between; align-items:center;">
              <div class="list-item-title" style="font-weight:${m.unread>0?'700':'600'};">${m.name}</div>
              <div style="font-size:10px; color:${m.unread>0?'var(--s2b-teal)':'var(--text-muted)'}; font-weight:${m.unread>0?'700':'400'};">${m.time}</div>
            </div>
            <div class="list-item-subtitle" style="font-weight:${m.unread>0?'500':'400'}; color:${m.unread>0?'var(--text-primary)':'var(--text-secondary)'};">${m.msg}</div>
          </div>
          ${m.unread > 0 ? `<div style="background:var(--s2b-teal);color:white;border-radius:999px;padding:2px 7px;font-size:11px;font-weight:700; margin-left:8px;">${m.unread}</div>` : ''}
        </div>`).join('')}
    </div>
    
    <!-- Active Conversation Preview -->
    <div class="card-section">
      <div class="card-section-title">Active Conversation — Alex Johnson</div>
      <div class="card">
        <div style="display:flex; flex-direction:column; gap:4px; margin-bottom:12px;">
          <div class="msg-bubble received">Is it normal to feel slightly itchy 1 hour after my dose today? It went away after 20 minutes.</div>
          <div class="msg-time" style="text-align:left;">Alex · 2:15 PM</div>
          
          <div class="msg-bubble sent">Thank you for reporting this, Alex. Mild, brief itching can sometimes occur. Since it resolved on its own in 20 minutes, that is reassuring. I will review your full assessment. Please continue to monitor and contact us immediately if symptoms return or worsen.</div>
          <div class="msg-time">Dr. Mitchell · 2:31 PM</div>
        </div>
        <div style="display:flex; gap:8px; align-items:center;">
          <input class="input-field" style="flex:1;" placeholder="Reply to Alex..." id="reply-input" aria-label="Reply to patient" />
          <button class="btn btn-sm btn-primary" style="border-radius:999px; padding:10px 16px;" id="send-reply-btn">Send</button>
        </div>
      </div>
    </div>
    
    <div style="padding-bottom:80px;"></div>
    ${doctorNav('messages')}
  </div>`;

INFO['doctor-messages'] = {
  screen: 'Doctor — Messages',
  role: 'doctor',
  desc: 'Secure patient messaging center. Conversation list and active chat. Clinical team can respond to patient questions.',
  ia: [
    { title: 'Search', body: 'Search conversations by patient name' },
    { title: 'Conversation List', body: 'All patient conversations with unread count, priority indicator, timestamp' },
    { title: 'Active Conversation', body: 'Inline message thread with reply input' },
  ],
  notes: 'Messaging is secure and HIPAA-compliant. Not an emergency service — clearly communicated in all patient-facing views.'
};

// ─────────────────────────────────────────────
// SCREEN: DESIGN SYSTEM
// ─────────────────────────────────────────────
SCREENS['design-system'] = () => `
  <div class="screen-full" style="background:var(--surface-base); min-height:780px;">
    ${statusBar('var(--surface-base)')}
    <div class="mobile-header">
      <div>
        <div class="header-title">Design System</div>
        <div class="header-subtitle">Safe2Bite Brand Foundation</div>
      </div>
    </div>
    
    <!-- Brand Colors -->
    <div class="ds-section">
      <div class="ds-section-title">Brand Colors</div>
      <div class="color-grid">
        ${[
          { label: 'Primary Blue', color: '#1b3863' },
          { label: 'Dark Blue', color: '#142b4e' },
          { label: 'Mid Blue', color: '#2a4f8a' },
          { label: 'Blue Tint', color: '#e8f0fc' },
          { label: 'Teal', color: '#00a5bb' },
          { label: 'Teal Dark', color: '#008fa2' },
          { label: 'Teal Mid', color: '#b3e8ef' },
          { label: 'Teal Light', color: '#edfcfc' },
        ].map(c => `
          <div class="color-swatch">
            <div class="color-swatch-block" style="background:${c.color};"></div>
            <div class="color-swatch-label">${c.label}<br><span style="font-family:monospace;font-size:8px;">${c.color}</span></div>
          </div>`).join('')}
      </div>
    </div>
    
    <!-- Status Colors -->
    <div class="ds-section">
      <div class="ds-section-title">Status Colors</div>
      <div class="color-grid">
        ${[
          { label: 'Success', color: '#1a9e5c' },
          { label: 'Attention', color: '#e6a817' },
          { label: 'Warning', color: '#d4640c' },
          { label: 'Urgent', color: '#c0392b' },
          { label: 'Critical', color: '#8b0000' },
          { label: 'Text Dark', color: '#1a2332' },
          { label: 'Text Sec.', color: '#64748b' },
          { label: 'Border', color: '#e2e8f0' },
        ].map(c => `
          <div class="color-swatch">
            <div class="color-swatch-block" style="background:${c.color};"></div>
            <div class="color-swatch-label">${c.label}<br><span style="font-family:monospace;font-size:8px;">${c.color}</span></div>
          </div>`).join('')}
      </div>
    </div>
    
    <!-- Typography -->
    <div class="ds-section">
      <div class="ds-section-title">Typography — Plus Jakarta Sans</div>
      <div class="type-sample"><div style="font-size:28px; font-weight:800; color:var(--s2b-blue);">Large Heading</div><div style="font-size:10px; color:var(--text-muted);">28px / 800 weight</div></div>
      <div class="type-sample"><div style="font-size:22px; font-weight:800; color:var(--s2b-blue);">Page Heading</div><div style="font-size:10px; color:var(--text-muted);">22px / 800 weight</div></div>
      <div class="type-sample"><div style="font-size:17px; font-weight:700; color:var(--text-dark);">Section Heading</div><div style="font-size:10px; color:var(--text-muted);">17px / 700 weight</div></div>
      <div class="type-sample"><div style="font-size:15px; font-weight:400; color:var(--text-primary);">Body Text — readable at all sizes</div><div style="font-size:10px; color:var(--text-muted);">15px / 400 weight</div></div>
      <div class="type-sample"><div style="font-size:12px; color:var(--text-secondary);">Caption text — supporting info</div><div style="font-size:10px; color:var(--text-muted);">12px / 400 weight</div></div>
      <div class="type-sample"><div style="font-size:15px; font-weight:600; color:white; background:var(--s2b-teal); display:inline-block; padding:8px 20px; border-radius:999px;">Button Label</div></div>
      <div class="type-sample"><div style="font-size:11px; font-weight:700; color:var(--s2b-success); letter-spacing:0.04em;">STATUS TEXT · UPPERCASE</div></div>
    </div>
    
    <!-- Status System -->
    <div class="ds-section">
      <div class="ds-section-title">Status System</div>
      <div style="display:flex; flex-direction:column; gap:8px;">
        <div class="status-badge completed" style="align-self:flex-start;">✓ Dose Completed — Normal</div>
        <div class="status-badge attention" style="align-self:flex-start;">📋 Assessment Required — Attention</div>
        <div class="status-badge warning" style="align-self:flex-start;">⚠️ Dose Missed — Warning</div>
        <div class="status-badge urgent" style="align-self:flex-start;">⚡ Reaction Reported — Urgent</div>
        <div class="status-badge critical" style="align-self:flex-start;">🚨 Emergency Alert — Critical</div>
      </div>
      <div style="margin-top:12px; font-size:11px; color:var(--text-secondary); line-height:1.6;">
        ℹ️ All status indicators use Icon + Text + Color to ensure accessibility and never rely on color alone.
      </div>
    </div>
    
    <!-- Spacing -->
    <div class="ds-section">
      <div class="ds-section-title">Spacing Scale</div>
      <div style="display:flex; flex-direction:column; gap:6px;">
        ${[4, 8, 12, 16, 20, 24, 32].map(s => `
          <div style="display:flex; align-items:center; gap:10px;">
            <div style="width:${s}px; height:${s}px; background:var(--s2b-teal); border-radius:2px; flex-shrink:0;"></div>
            <div style="font-size:11px; color:var(--text-secondary);">${s}px</div>
          </div>`).join('')}
      </div>
    </div>
    
    <div style="padding-bottom:40px;"></div>
  </div>`;

INFO['design-system'] = {
  screen: 'Design System',
  role: 'system',
  desc: 'Safe2Bite brand foundation. Colors, typography, spacing, and status system that all future screens must follow.',
  ia: [
    { title: 'Brand Colors', body: 'Primary Blue #1b3863 + Teal #00a5bb as core palette' },
    { title: 'Status Colors', body: '5-level system: Success → Attention → Warning → Urgent → Critical' },
    { title: 'Typography', body: 'Plus Jakarta Sans · 5 size hierarchy levels' },
    { title: 'Status System', body: 'Icon + Text + Color — never color alone' },
    { title: 'Spacing', body: '4px base unit — 4, 8, 12, 16, 20, 24, 32px scale' },
  ]
};

// ─────────────────────────────────────────────
// SCREEN: COMPONENTS
// ─────────────────────────────────────────────
SCREENS['components'] = () => `
  <div class="screen-full" style="background:var(--surface-base); min-height:780px;">
    ${statusBar('var(--surface-base)')}
    <div class="mobile-header">
      <div class="header-title">Components</div>
      <div class="header-subtitle">Reusable UI library</div>
    </div>
    
    <!-- Buttons -->
    <div class="ds-section">
      <div class="ds-section-title">Buttons</div>
      <div class="comp-grid">
        <button class="btn btn-primary" style="max-width:200px;" id="comp-primary-btn">Primary Button</button>
        <button class="btn btn-secondary" style="max-width:200px;" id="comp-secondary-btn">Secondary Button</button>
        <button class="btn btn-text" id="comp-text-btn">Text Button</button>
        <button class="btn btn-danger" style="max-width:200px;" id="comp-danger-btn">🚨 Emergency Action</button>
      </div>
    </div>
    
    <!-- Status Badges -->
    <div class="ds-section">
      <div class="ds-section-title">Status Badges</div>
      <div style="display:flex; flex-wrap:wrap; gap:8px;">
        <div class="status-badge completed">✓ Completed</div>
        <div class="status-badge attention">📋 Attention</div>
        <div class="status-badge warning">⚠️ Warning</div>
        <div class="status-badge urgent">⚡ Urgent</div>
        <div class="status-badge critical">🚨 Critical</div>
      </div>
    </div>
    
    <!-- Dose Card -->
    <div class="ds-section">
      <div class="ds-section-title">Dose Card</div>
      <div class="dose-card">
        <div class="dose-card-label">Today's Dose</div>
        <div class="dose-card-value">5 <span class="dose-card-unit">mg</span></div>
        <div class="dose-card-meta">⏰ Take with food · 8:00 AM</div>
        <div class="dose-card-actions">
          <button class="dose-card-btn primary" id="comp-dose-confirm">✓ Confirm Dose</button>
          <button class="dose-card-btn secondary" id="comp-dose-missed">Missed</button>
        </div>
      </div>
    </div>
    
    <!-- Alert Cards -->
    <div class="ds-section">
      <div class="ds-section-title">Alert Cards</div>
      <div class="alert-card critical">
        <div class="alert-icon">🚨</div>
        <div><div class="alert-title">Critical — Emergency Alert</div><div class="alert-body">Requires immediate clinical attention.</div></div>
      </div>
      <div class="alert-card urgent">
        <div class="alert-icon">⚠️</div>
        <div><div class="alert-title">Urgent — Reaction Reported</div><div class="alert-body">Patient reported symptoms after dose.</div></div>
      </div>
      <div class="alert-card warning">
        <div class="alert-icon">⏰</div>
        <div><div class="alert-title">Warning — Dose Missed</div><div class="alert-body">Scheduled dose was not confirmed.</div></div>
      </div>
      <div class="alert-card attention">
        <div class="alert-icon">📋</div>
        <div><div class="alert-title">Attention — Assessment Due</div><div class="alert-body">Daily health check-in required.</div></div>
      </div>
      <div class="alert-card info">
        <div class="alert-icon">ℹ️</div>
        <div><div class="alert-title">Info — Care Team Note</div><div class="alert-body">Instructions from your care team.</div></div>
      </div>
    </div>
    
    <!-- Input Fields -->
    <div class="ds-section">
      <div class="ds-section-title">Input Fields</div>
      <div class="input-group">
        <label class="input-label" for="comp-input-1">Text Field</label>
        <input id="comp-input-1" class="input-field" type="text" placeholder="Enter value..." aria-label="Sample text input" />
      </div>
      <div class="input-group">
        <label class="input-label" for="comp-input-2">Search Field</label>
        <input id="comp-input-2" class="input-field" type="search" placeholder="🔍  Search..." aria-label="Sample search input" />
      </div>
    </div>
    
    <!-- Progress -->
    <div class="ds-section">
      <div class="ds-section-title">Progress Indicators</div>
      <div style="display:flex; flex-direction:column; gap:14px;">
        <div>
          <div style="display:flex; justify-content:space-between; margin-bottom:6px; font-size:12px; font-weight:600; color:var(--text-secondary);">
            <span>Treatment Progress</span><span>62%</span>
          </div>
          <div class="progress-bar-wrap"><div class="progress-bar-fill" style="width:62%;"></div></div>
        </div>
        <div>
          <div style="display:flex; justify-content:space-between; margin-bottom:6px; font-size:12px; font-weight:600; color:var(--text-secondary);">
            <span>Dose Adherence</span><span>94%</span>
          </div>
          <div class="progress-bar-wrap"><div class="progress-bar-fill" style="width:94%; background:linear-gradient(90deg,var(--s2b-success),#27ae60);"></div></div>
        </div>
      </div>
    </div>
    
    <!-- Empty State -->
    <div class="ds-section">
      <div class="ds-section-title">Empty State</div>
      <div class="card">
        <div class="empty-state">
          <div class="empty-state-icon">📭</div>
          <div class="empty-state-title">No Messages Yet</div>
          <div class="empty-state-text">When your care team sends you a message, it will appear here.</div>
        </div>
      </div>
    </div>
    
    <div style="padding-bottom:40px;"></div>
  </div>`;

INFO['components'] = {
  screen: 'Component Library',
  role: 'system',
  desc: 'Reusable UI components established in Pass 1. All future screens must draw from this library for visual consistency.',
  ia: [
    { title: 'Buttons', body: 'Primary, Secondary, Text, Danger/Emergency' },
    { title: 'Status Badges', body: '5-level badge system with icon + text' },
    { title: 'Dose Card', body: 'Prominent dose display with action buttons' },
    { title: 'Alert Cards', body: 'Contextual alert cards by severity level' },
    { title: 'Input Fields', body: 'Text, search, date — consistent styling' },
    { title: 'Progress Bars', body: 'Gradient progress indicators' },
    { title: 'Empty State', body: 'Friendly empty states with illustration + message' },
  ]
};

// ─────────────────────────────────────────────
// SCREEN: SITEMAP
// ─────────────────────────────────────────────
SCREENS['sitemap'] = () => `
  <div class="screen-full" style="background:var(--surface-base); min-height:780px;">
    ${statusBar('var(--surface-base)')}
    <div class="mobile-header">
      <div class="header-title">App Sitemap</div>
      <div class="header-subtitle">Full Information Architecture</div>
    </div>
    
    <!-- Patient IA -->
    <div class="card-section">
      <div class="card-section-title" style="color:var(--s2b-blue);">&#128197; PATIENT / CAREGIVER NAVIGATION</div>
      ${[
        { tab: 'TODAY', icon: '📅', children: ['Daily Health Assessment','Today\'s Dose','Dose Confirmation','Reaction Check','Food Intake','Today\'s Tasks','Upcoming Dose','Treatment Progress','Care Team Status'] },
        { tab: 'TREATMENT', icon: '💊', children: ['Current Treatment','Current Dose','Goal Dose','Treatment Phase','Dose Instructions','Upcoming Doses','Treatment History'] },
        { tab: 'PROGRESS', icon: '📈', children: ['Overall Progress','Dose Adherence','Dose History','Reaction History','Illness History','Assessment History','Treatment Milestones'] },
        { tab: 'CARE', icon: '❤️', children: ['Care Team','Messages','Appointments','Educational Content','Help','Emergency Help'] },
        { tab: 'PROFILE', icon: '👤', children: ['Personal Information','Emergency Contact','Caregiver','Notifications','Privacy & Security','Account Settings','Support'] },
      ].map(t => `
        <div class="sitemap-root">
          <div class="sitemap-node">${t.icon} ${t.tab}</div>
          <div class="sitemap-children">
            ${t.children.map(c => `<div class="sitemap-leaf">└ ${c}</div>`).join('')}
          </div>
        </div>`).join('')}
    </div>
    
    <!-- Caregiver Extension -->
    <div class="card-section">
      <div class="card-section-title" style="color:#7c3aed;">&#128106; CAREGIVER EXTENSION</div>
      <div class="sitemap-root">
        <div class="sitemap-node" style="border-color:#7c3aed;">👨‍👩‍👧 MY FAMILY / MY PATIENTS</div>
        <div class="sitemap-children">
          <div class="sitemap-leaf">└ Patient List (Multiple Children)</div>
          <div class="sitemap-leaf">└ Patient Selector</div>
          <div class="sitemap-leaf">└ Selected Patient Banner (Always Visible)</div>
          <div class="sitemap-leaf">└ Patient Today / Treatment / Progress / Care</div>
        </div>
      </div>
    </div>
    
    <!-- Doctor IA -->
    <div class="card-section">
      <div class="card-section-title" style="color:#065f46;">&#129658; DOCTOR / CARE TEAM NAVIGATION</div>
      ${[
        { tab: 'DASHBOARD', icon: '🩺', children: ['Patient Overview','Assessments to Review','Critical Alerts','Urgent Alerts','Patients Requiring Attention','Recent Messages'] },
        { tab: 'PATIENTS', icon: '👥', children: ['Patient Search','Patient List','Filters','Patient Profile →'] },
        { tab: 'PATIENT PROFILE', icon: '🗂️', children: ['Patient Overview','Today\'s Status','Current Dose','Upcoming Dose','Treatment Plan','Assessments','Reactions','Illness','Food Intake','Patient Timeline','Alerts','Clinical Notes','Message Patient'] },
        { tab: 'ALERTS', icon: '🔔', children: ['Critical','Urgent','Attention','Alert Details'] },
        { tab: 'MESSAGES', icon: '💬', children: ['Conversation List','Patient Conversation'] },
        { tab: 'MORE', icon: '⋯', children: ['Appointments','Doctor Profile','Notification Settings','Support'] },
      ].map(t => `
        <div class="sitemap-root">
          <div class="sitemap-node" style="border-color:#065f46;">${t.icon} ${t.tab}</div>
          <div class="sitemap-children">
            ${t.children.map(c => `<div class="sitemap-leaf">└ ${c}</div>`).join('')}
          </div>
        </div>`).join('')}
    </div>
    
    <div style="padding-bottom:40px;"></div>
  </div>`;

INFO['sitemap'] = {
  screen: 'Application Sitemap',
  role: 'system',
  desc: 'Full information architecture for all three user roles. Establishes the complete screen hierarchy for all future passes.',
  ia: [
    { title: 'Patient/Caregiver', body: 'Today / Treatment / Progress / Care / Profile — 5 primary tabs' },
    { title: 'Caregiver Extension', body: 'My Family overlaid on patient experience with persistent patient identity' },
    { title: 'Doctor/Care Team', body: 'Dashboard / Patients / Alerts / Messages / More — 5 primary tabs' },
  ]
};

// ─────────────────────────────────────────────
// SCREEN: USER FLOWS
// ─────────────────────────────────────────────
SCREENS['user-flows'] = () => `
  <div class="screen-full" style="background:var(--surface-base); min-height:780px;">
    ${statusBar('var(--surface-base)')}
    <div class="mobile-header">
      <div class="header-title">User Flows</div>
      <div class="header-subtitle">High-level journey maps</div>
    </div>
    
    <!-- Patient Journey -->
    <div class="card-section">
      <div class="card-section-title">Patient Primary Journey</div>
      <div class="card">
        <div class="flow-step">
          ${['Splash Screen','Onboarding (1-2-3)','Login / Sign Up','Patient Setup','Today Dashboard','Health Assessment','Today\'s Dose','Dose Confirmation','Reaction Check','Progress & Care','Appointments / Messages']
            .map(s => `<div class="flow-node">${s}</div><div class="flow-arrow">↓</div>`)
            .join('').replace(/<div class="flow-arrow">↓<\/div>$/, '')}
        </div>
      </div>
    </div>
    
    <!-- Missed Dose Flow -->
    <div class="card-section">
      <div class="card-section-title" style="color:var(--s2b-warning);">⚠️ Missed Dose Flow</div>
      <div class="card">
        <div class="flow-step">
          <div class="flow-node">Today's Dose Screen</div><div class="flow-arrow">↓</div>
          <div class="flow-node action">"I Didn't Take My Dose"</div><div class="flow-arrow">↓</div>
          <div class="flow-node">Select Reason</div><div class="flow-arrow">↓</div>
          <div class="flow-node action">Doctor-Configured Instructions</div><div class="flow-arrow">↓</div>
          <div class="flow-node decision">Contact Care Team Required?</div><div class="flow-arrow">↓</div>
          <div class="flow-node">Care Team Notified</div>
        </div>
        <div style="margin-top:12px; font-size:11px; color:var(--text-secondary); line-height:1.6;">⚠️ No medical advice is invented here. All missed dose instructions are configured by the authorized care team.</div>
      </div>
    </div>
    
    <!-- Reaction Flow -->
    <div class="card-section">
      <div class="card-section-title" style="color:var(--s2b-urgent);">⚡ Reaction Reporting Flow</div>
      <div class="card">
        <div class="flow-step">
          <div class="flow-node">Today Screen</div><div class="flow-arrow">↓</div>
          <div class="flow-node action">Reaction Check</div><div class="flow-arrow">↓</div>
          <div class="flow-node">Select Symptoms</div><div class="flow-arrow">↓</div>
          <div class="flow-node">Rate Severity</div><div class="flow-arrow">↓</div>
          <div class="flow-node">Submit Report</div><div class="flow-arrow">↓</div>
          <div class="flow-node action">Care Team Notified</div><div class="flow-arrow">↓</div>
          <div class="flow-node alert">Emergency Guidance (if required)</div>
        </div>
        <div style="margin-top:12px; font-size:11px; color:var(--text-secondary); line-height:1.6;">⚠️ Emergency guidance content is provided exclusively by Safe2Bite's clinical team, not auto-generated.</div>
      </div>
    </div>
    
    <!-- Doctor Journey -->
    <div class="card-section">
      <div class="card-section-title" style="color:#065f46;">🩺 Doctor Journey</div>
      <div class="card">
        <div class="flow-step">
          ${['Doctor Login','Doctor Dashboard','Alerts / Patient List','Patient Profile','Today\'s Assessment','Patient Timeline','Treatment Details','Clinical Note / Message','Acknowledge Alert']
            .map(s => `<div class="flow-node" style="border-color:#065f46; color:#065f46;">${s}</div><div class="flow-arrow" style="color:#065f46;">↓</div>`)
            .join('').replace(/<div class="flow-arrow" style="color:#065f46;">↓<\/div>$/, '')}
        </div>
      </div>
    </div>
    
    <!-- Role-Based Access -->
    <div class="card-section">
      <div class="card-section-title">Role-Based Access</div>
      <div style="display:flex; flex-direction:column; gap:8px;">
        ${[
          { role: 'Patient', color: 'var(--s2b-blue)', desc: 'View own care plan, submit own data' },
          { role: 'Caregiver', color: '#7c3aed', desc: 'View/manage authorized patient profiles' },
          { role: 'Doctor', color: '#065f46', desc: 'View assigned patients, authorized clinical actions' },
          { role: 'Nurse/Care Team', color: '#0369a1', desc: 'Access based on assigned permissions' },
        ].map(r => `
          <div style="background:white; border-radius:var(--radius-md); border:1px solid var(--border-light); padding:12px 14px; display:flex; align-items:center; gap:12px;">
            <div style="width:10px; height:10px; border-radius:50%; background:${r.color}; flex-shrink:0;"></div>
            <div>
              <div style="font-size:13px; font-weight:700; color:${r.color};">${r.role}</div>
              <div style="font-size:11px; color:var(--text-secondary);">${r.desc}</div>
            </div>
          </div>`).join('')}
      </div>
    </div>
    
    <div style="padding-bottom:40px;"></div>
  </div>`;

INFO['user-flows'] = {
  screen: 'User Flows',
  role: 'system',
  desc: 'High-level journey maps for all primary user flows. Establishes the overall app navigation logic and role-based access model.',
  ia: [
    { title: 'Patient Journey', body: 'Splash → Onboarding → Login → Dashboard → Daily care loop' },
    { title: 'Missed Dose Flow', body: 'Reason capture → care team-configured instructions → contact if needed' },
    { title: 'Reaction Flow', body: 'Symptom capture → severity → submission → care team notification → emergency guidance' },
    { title: 'Doctor Journey', body: 'Login → Dashboard → Patient review → clinical actions' },
    { title: 'Role-Based Access', body: 'Patient / Caregiver / Doctor / Nurse permission model' },
  ]
};

// ═══════════════════════════════════════════════════════════
//  PASS 2 — AUTHENTICATION + ONBOARDING + ACCOUNT SETUP
// ═══════════════════════════════════════════════════════════

// ─────────────────────────────────────────────
// HELPER: Step progress indicator
// ─────────────────────────────────────────────
function stepProgress(current, total) {
  const dots = Array.from({length: total}, (_, i) => {
    const cls = i < current - 1 ? 'step-dot done' : i === current - 1 ? 'step-dot active' : 'step-dot';
    return `<div class="${cls}"></div>`;
  }).join('');
  return `
    <div class="step-progress">
      <span class="step-progress-label">Step ${current} of ${total}</span>
      <div class="step-dots">${dots}</div>
    </div>`;
}

// ─────────────────────────────────────────────
// HELPER: OTP boxes (visual demo, 6 digits)
// ─────────────────────────────────────────────
function otpBoxes(filledCount = 3, hasError = false) {
  const digits = ['4', '2', '8', '', '', ''];
  return `
    <div class="otp-row" role="group" aria-label="Verification code input">
      ${digits.map((d, i) => {
        let cls = 'otp-box';
        if (hasError) cls += ' error-box';
        else if (d) cls += ' filled';
        else if (i === filledCount) cls += ' active-box';
        return `<div class="${cls}" aria-label="Digit ${i+1}">${d}</div>`;
      }).join('')}
    </div>`;
}

// ─────────────────────────────────────────────
// SCREEN: CREATE ACCOUNT
// ─────────────────────────────────────────────
SCREENS['create-account'] = () => `
  <div class="auth-screen">
    ${statusBar('#fff')}
    <div class="auth-back-bar">
      <button class="auth-back-btn" onclick="showScreen('role-select')" aria-label="Back to role selection">
        ${icon('arrow-left', 18, 'var(--s2b-teal)')} Back
      </button>
    </div>
    <div style="flex:1; overflow-y:auto; scrollbar-width:none; padding:0 28px 40px;">
      <div class="auth-header">
        <div class="auth-icon-wrap teal">${icon('user-plus', 28, 'var(--s2b-teal)')}</div>
        <div class="auth-title">Create Your Account</div>
        <div class="auth-subtitle">Create an account to securely manage your allergy care.</div>
      </div>
      <div class="security-notice">
        <div style="flex-shrink:0; margin-top:1px;">${icon('shield-check', 16, 'var(--s2b-teal)')}</div>
        <div class="security-notice-text"><strong>Secure &amp; Private</strong>Your information is encrypted and only shared with your authorized care team.</div>
      </div>
      <div class="input-group">
        <label class="input-label" for="ca-fname">First Name</label>
        <div class="input-icon-wrap">
          <span class="input-icon-left">${icon('user', 16, 'var(--text-muted)')}</span>
          <input id="ca-fname" class="input-field" type="text" placeholder="First name" aria-label="First Name" />
        </div>
      </div>
      <div class="input-group">
        <label class="input-label" for="ca-lname">Last Name</label>
        <div class="input-icon-wrap">
          <span class="input-icon-left">${icon('user', 16, 'var(--text-muted)')}</span>
          <input id="ca-lname" class="input-field" type="text" placeholder="Last name" aria-label="Last Name" />
        </div>
      </div>
      <div class="input-group">
        <label class="input-label" for="ca-email">Email Address</label>
        <div class="input-icon-wrap">
          <span class="input-icon-left">${icon('mail', 16, 'var(--text-muted)')}</span>
          <input id="ca-email" class="input-field" type="email" placeholder="your@email.com" aria-label="Email Address" />
        </div>
      </div>
      <div class="input-group">
        <label class="input-label" for="ca-phone">Mobile Phone</label>
        <div class="input-icon-wrap">
          <span class="input-icon-left">${icon('phone', 16, 'var(--text-muted)')}</span>
          <input id="ca-phone" class="input-field" type="tel" placeholder="(555) 000-0000" aria-label="Mobile Phone" />
        </div>
      </div>
      <div class="input-group">
        <label class="input-label" for="ca-pw">Password</label>
        <div class="input-icon-wrap">
          <span class="input-icon-left">${icon('lock', 16, 'var(--text-muted)')}</span>
          <input id="ca-pw" class="input-field" type="password" placeholder="Create a password" aria-label="Password" style="padding-right:44px;" />
          <button class="input-icon-right" aria-label="Show password">${icon('eye', 16, 'var(--text-muted)')}</button>
        </div>
        <div class="pw-strength-row">
          <div class="pw-strength-bar good"></div>
          <div class="pw-strength-bar good"></div>
          <div class="pw-strength-bar"></div>
          <div class="pw-strength-bar"></div>
        </div>
        <div class="pw-strength-label good">Fair — add symbols for stronger</div>
        <ul class="pw-req-list" aria-label="Password requirements">
          <li class="pw-req-item met"><div class="pw-req-dot"></div> At least 8 characters</li>
          <li class="pw-req-item met"><div class="pw-req-dot"></div> Uppercase and lowercase letters</li>
          <li class="pw-req-item"><div class="pw-req-dot"></div> At least one number</li>
          <li class="pw-req-item"><div class="pw-req-dot"></div> At least one symbol</li>
        </ul>
      </div>
      <div class="input-group">
        <label class="input-label" for="ca-cpw">Confirm Password</label>
        <div class="input-icon-wrap">
          <span class="input-icon-left">${icon('lock', 16, 'var(--text-muted)')}</span>
          <input id="ca-cpw" class="input-field" type="password" placeholder="Repeat your password" aria-label="Confirm Password" style="padding-right:44px;" />
          <button class="input-icon-right" aria-label="Show confirm password">${icon('eye', 16, 'var(--text-muted)')}</button>
        </div>
      </div>
      <div style="margin-bottom:24px;">
        <button class="btn btn-primary" onclick="showScreen('email-verify')" id="create-account-btn">Create Account</button>
      </div>
      <div style="text-align:center;">
        <span style="font-size:13px; color:var(--text-secondary);">Already have an account? </span>
        <span onclick="showScreen('login')" style="font-size:13px; color:var(--s2b-teal); font-weight:600; cursor:pointer;">Log In</span>
      </div>
    </div>
  </div>`;

INFO['create-account'] = {
  screen: 'Create Account',
  role: 'system',
  desc: 'New user registration. Collects name, email, phone and password. Password strength meter shows in real-time. Submitting goes to email verification.',
  ia: [
    { title: 'First / Last Name', body: 'Identity fields' },
    { title: 'Email Address', body: 'Login identifier, will be verified' },
    { title: 'Mobile Phone', body: 'For optional SMS verification' },
    { title: 'Password + Confirm', body: 'With strength indicator and requirements list' },
    { title: 'Show Password', body: 'Eye icon toggle per field' },
    { title: 'Create Account', body: 'Submits → Email Verification' },
    { title: 'Log In', body: 'Existing users → Login screen' },
  ],
  notes: 'Security notice card reassures healthcare context. Password requirements shown inline, not in a modal. No clinical data collected here.'
};

// ─────────────────────────────────────────────
// SCREEN: EMAIL VERIFICATION
// ─────────────────────────────────────────────
SCREENS['email-verify'] = () => `
  <div class="auth-screen">
    ${statusBar('#fff')}
    <div class="auth-back-bar">
      <button class="auth-back-btn" onclick="showScreen('create-account')" aria-label="Back">
        ${icon('arrow-left', 18, 'var(--s2b-teal)')} Back
      </button>
    </div>
    <div style="flex:1; overflow-y:auto; scrollbar-width:none; padding:0 28px 40px;">
      <div class="auth-header">
        <div class="auth-icon-wrap teal">${icon('mail', 28, 'var(--s2b-teal)')}</div>
        <div class="auth-title">Verify Your Email</div>
        <div class="auth-subtitle">We sent a 6-digit code to<br><strong style="color:var(--s2b-blue);">alex@email.com</strong></div>
      </div>
      ${otpBoxes(3)}
      <div class="resend-row">
        <span>Didn't receive the code?</span>
        <button class="resend-link" id="resend-code-btn">${icon('refresh', 14, 'var(--s2b-teal)')} Resend Code</button>
      </div>
      <div style="text-align:center; margin-top:6px;">
        <button onclick="showScreen('create-account')" class="resend-link" style="color:var(--text-secondary); font-size:12px;">${icon('edit', 12, 'var(--text-muted)')} Change Email Address</button>
      </div>
      <div style="margin-top:28px;">
        <button class="btn btn-primary" onclick="showScreen('phone-verify')" id="verify-email-btn">Verify Email</button>
      </div>
      <div style="margin-top:12px; padding:12px 14px; background:var(--s2b-teal-light); border-radius:var(--radius-lg); display:flex; align-items:flex-start; gap:8px;">
        ${icon('info', 14, 'var(--s2b-teal)')}
        <div style="font-size:12px; color:var(--s2b-teal-dark); line-height:1.55;">Check your spam or junk folder if you don't see the email within a few minutes.</div>
      </div>
    </div>
  </div>`;

INFO['email-verify'] = {
  screen: 'Email Verification',
  role: 'system',
  desc: 'Verifies the user\'s email address with a 6-digit code. OTP boxes show entered state. Resend and change email options available.',
  ia: [
    { title: 'OTP Box Row', body: '6 individual digit inputs — current digit highlighted' },
    { title: 'Resend Code', body: 'Triggers new code send, button has cooldown in production' },
    { title: 'Change Email', body: 'Returns to Create Account screen' },
    { title: 'Verify Email', body: 'Validates code → Phone Verification (or Profile Setup if phone skipped)' },
    { title: 'Info Notice', body: 'Spam folder reminder — helpful, non-alarming' },
  ]
};

// ─────────────────────────────────────────────
// SCREEN: PHONE VERIFICATION
// ─────────────────────────────────────────────
SCREENS['phone-verify'] = () => `
  <div class="auth-screen">
    ${statusBar('#fff')}
    <div class="auth-back-bar">
      <button class="auth-back-btn" onclick="showScreen('email-verify')" aria-label="Back">
        ${icon('arrow-left', 18, 'var(--s2b-teal)')} Back
      </button>
    </div>
    <div style="flex:1; overflow-y:auto; scrollbar-width:none; padding:0 28px 40px;">
      <div class="auth-header">
        <div class="auth-icon-wrap teal">${icon('phone-check', 28, 'var(--s2b-teal)')}</div>
        <div class="auth-title">Verify Your Mobile Number</div>
        <div class="auth-subtitle">Enter the code sent to<br><strong style="color:var(--s2b-blue);">(555) 012-3456</strong></div>
      </div>
      ${otpBoxes(4)}
      <div class="resend-row">
        <span>Didn't receive the code?</span>
        <button class="resend-link" id="resend-sms-btn">${icon('refresh', 14, 'var(--s2b-teal)')} Resend Code</button>
      </div>
      <div style="text-align:center; margin-top:6px;">
        <button onclick="showScreen('create-account')" class="resend-link" style="color:var(--text-secondary); font-size:12px;">${icon('edit', 12, 'var(--text-muted)')} Change Mobile Number</button>
      </div>
      <div style="margin-top:28px;">
        <button class="btn btn-primary" onclick="showScreen('patient-profile-setup')" id="verify-phone-btn">Verify Mobile Number</button>
        <button onclick="showScreen('patient-profile-setup')" class="btn btn-text" style="width:100%; margin-top:8px; color:var(--text-secondary);">Skip for Now</button>
      </div>
      <div style="margin-top:16px; padding:12px 14px; background:var(--s2b-attention-bg); border-radius:var(--radius-lg); display:flex; align-items:flex-start; gap:8px; border:1px solid #ffe082;">
        ${icon('info', 14, 'var(--s2b-attention)')}
        <div style="font-size:12px; color:var(--s2b-warning); line-height:1.55;">Mobile verification may be required depending on your account configuration. Your care team will notify you if it is mandatory.</div>
      </div>
    </div>
  </div>`;

INFO['phone-verify'] = {
  screen: 'Mobile Phone Verification',
  role: 'system',
  desc: 'Optional SMS verification step. Can be enabled/disabled by system configuration. Users can skip if not required.',
  ia: [
    { title: 'OTP Boxes', body: 'Same pattern as email verification for consistency' },
    { title: 'Resend / Change Number', body: 'Same pattern as email for predictability' },
    { title: 'Verify Button', body: 'Validates → Patient Profile Setup' },
    { title: 'Skip for Now', body: 'System-configurable — shown only if SMS is optional' },
    { title: 'Configuration Notice', body: 'Transparent communication about requirement status' },
  ],
  notes: 'This screen is system-configurable. The skip option may be hidden if SMS verification is mandatory.'
};

// ─────────────────────────────────────────────
// SCREEN: FORGOT PASSWORD
// ─────────────────────────────────────────────
SCREENS['forgot-password'] = () => `
  <div class="auth-screen">
    ${statusBar('#fff')}
    <div class="auth-back-bar">
      <button class="auth-back-btn" onclick="showScreen('login')" aria-label="Back to Login">
        ${icon('arrow-left', 18, 'var(--s2b-teal)')} Back to Login
      </button>
    </div>
    <div style="flex:1; overflow-y:auto; scrollbar-width:none; padding:0 28px 40px;">
      <div class="auth-header">
        <div class="auth-icon-wrap warning">${icon('key', 28, 'var(--s2b-attention)')}</div>
        <div class="auth-title">Forgot Your Password?</div>
        <div class="auth-subtitle">Enter the email address associated with your Safe2Bite account and we'll help you reset your password.</div>
      </div>
      <div class="input-group">
        <label class="input-label" for="fp-email">Email Address</label>
        <div class="input-icon-wrap">
          <span class="input-icon-left">${icon('mail', 16, 'var(--text-muted)')}</span>
          <input id="fp-email" class="input-field" type="email" placeholder="your@email.com" aria-label="Email Address" value="alex@email.com" />
        </div>
      </div>
      <div style="margin-bottom:16px;">
        <button class="btn btn-primary" onclick="showScreen('reset-email-sent')" id="send-reset-btn">Send Reset Link</button>
      </div>
      <div style="text-align:center;">
        <span onclick="showScreen('login')" style="font-size:13px; color:var(--s2b-teal); font-weight:600; cursor:pointer;">Return to Login</span>
      </div>
    </div>
  </div>`;

INFO['forgot-password'] = {
  screen: 'Forgot Password',
  role: 'system',
  desc: 'Password recovery entry point. User provides their email address and receives a reset link.',
  ia: [
    { title: 'Email Field', body: 'Pre-populated if user came from login with email entered' },
    { title: 'Send Reset Link', body: 'Sends email → Reset Email Sent confirmation screen' },
    { title: 'Return to Login', body: 'Easy escape without dead-end' },
  ]
};

// ─────────────────────────────────────────────
// SCREEN: RESET EMAIL SENT
// ─────────────────────────────────────────────
SCREENS['reset-email-sent'] = () => `
  <div class="auth-screen">
    ${statusBar('#fff')}
    <div style="flex:1; overflow-y:auto; scrollbar-width:none; padding:0 28px 40px;">
      <div style="padding-top:60px;">
        <div class="success-block">
          <div class="success-icon-circle">${icon('mail', 36, 'var(--s2b-success)')}</div>
          <div class="success-title">Check Your Email</div>
          <div class="success-body">Password reset instructions have been sent to <strong style="color:var(--s2b-blue);">alex@email.com</strong><br><br>The link expires in 30 minutes.</div>
        </div>
      </div>
      <div style="padding:0 4px; margin-top:8px;">
        <button class="btn btn-primary" onclick="showScreen('create-new-password')" id="reset-continue-btn" style="margin-bottom:12px;">Open Reset Link</button>
        <button class="btn btn-secondary" style="width:100%; margin-bottom:24px;" id="resend-reset-btn">${icon('refresh', 16, 'var(--s2b-teal)')} Resend Email</button>
        <div style="text-align:center;">
          <span onclick="showScreen('login')" style="font-size:13px; color:var(--s2b-teal); font-weight:600; cursor:pointer;">Back to Login</span>
        </div>
      </div>
      <div style="margin-top:24px; padding:12px 14px; background:var(--surface-base); border-radius:var(--radius-lg); border:1px solid var(--border-light);">
        <div style="font-size:12px; color:var(--text-secondary); line-height:1.6;">
          ${icon('info', 12, 'var(--text-muted)')} Didn't receive it? Check your spam folder, or confirm the email address is correct.
        </div>
      </div>
    </div>
  </div>`;

INFO['reset-email-sent'] = {
  screen: 'Reset Email Sent',
  role: 'system',
  desc: 'Success confirmation that the reset link was sent. Provides guidance and resend option without confusion.',
  ia: [
    { title: 'Success Icon + Title', body: 'Clear confirmation with green success animation' },
    { title: 'Email Confirmation', body: 'Shows which address the email was sent to' },
    { title: 'Open Reset Link', body: 'Demo link to show next screen (create-new-password)' },
    { title: 'Resend Email', body: 'In production, has cooldown timer' },
    { title: 'Back to Login', body: 'Clear exit path' },
  ]
};

// ─────────────────────────────────────────────
// SCREEN: CREATE NEW PASSWORD
// ─────────────────────────────────────────────
SCREENS['create-new-password'] = () => `
  <div class="auth-screen">
    ${statusBar('#fff')}
    <div style="flex:1; overflow-y:auto; scrollbar-width:none; padding:0 28px 40px;">
      <div class="auth-header" style="padding-top:32px;">
        <div class="auth-icon-wrap blue">${icon('lock', 28, 'var(--s2b-blue)')}</div>
        <div class="auth-title">Create a New Password</div>
        <div class="auth-subtitle">Choose a strong password to protect your Safe2Bite account.</div>
      </div>
      <div class="input-group">
        <label class="input-label" for="np-pw">New Password</label>
        <div class="input-icon-wrap">
          <span class="input-icon-left">${icon('lock', 16, 'var(--text-muted)')}</span>
          <input id="np-pw" class="input-field" type="password" placeholder="New password" aria-label="New Password" style="padding-right:44px;" />
          <button class="input-icon-right" aria-label="Show password">${icon('eye', 16, 'var(--text-muted)')}</button>
        </div>
        <div class="pw-strength-row">
          <div class="pw-strength-bar strong"></div>
          <div class="pw-strength-bar strong"></div>
          <div class="pw-strength-bar strong"></div>
          <div class="pw-strength-bar strong"></div>
        </div>
        <div class="pw-strength-label strong">Strong password</div>
        <ul class="pw-req-list">
          <li class="pw-req-item met"><div class="pw-req-dot"></div> At least 8 characters</li>
          <li class="pw-req-item met"><div class="pw-req-dot"></div> Uppercase and lowercase letters</li>
          <li class="pw-req-item met"><div class="pw-req-dot"></div> At least one number</li>
          <li class="pw-req-item met"><div class="pw-req-dot"></div> At least one symbol</li>
        </ul>
      </div>
      <div class="input-group">
        <label class="input-label" for="np-cpw">Confirm New Password</label>
        <div class="input-icon-wrap">
          <span class="input-icon-left">${icon('lock', 16, 'var(--text-muted)')}</span>
          <input id="np-cpw" class="input-field verified" type="password" placeholder="Repeat new password" aria-label="Confirm New Password" style="padding-right:44px;" />
          <span class="input-icon-right">${icon('check-circle', 16, 'var(--s2b-success)')}</span>
        </div>
      </div>
      <div style="margin-bottom:12px;">
        <button class="btn btn-primary" onclick="showScreen('password-updated')" id="update-pw-btn">Update Password</button>
      </div>
    </div>
  </div>`;

INFO['create-new-password'] = {
  screen: 'Create New Password',
  role: 'system',
  desc: 'Password reset form. Shows strength meter and all requirements met. Passwords match confirmed with green border + check icon.',
  ia: [
    { title: 'New Password', body: 'With eye toggle, strength bars, requirements list' },
    { title: 'Confirm Password', body: 'Match confirmed with green border and checkmark icon' },
    { title: 'Update Password', body: 'Saves → Password Updated success screen' },
  ]
};

// ─────────────────────────────────────────────
// SCREEN: PASSWORD UPDATED
// ─────────────────────────────────────────────
SCREENS['password-updated'] = () => `
  <div class="auth-screen">
    ${statusBar('#fff')}
    <div style="flex:1; overflow-y:auto; scrollbar-width:none; padding:0 28px 40px;">
      <div style="padding-top:80px;">
        <div class="success-block">
          <div class="success-icon-circle">${icon('shield-check', 36, 'var(--s2b-success)')}</div>
          <div class="success-title">Password Updated</div>
          <div class="success-body">Your password has been successfully updated. You can now log in with your new password.</div>
        </div>
      </div>
      <div style="padding:0 4px; margin-top:32px;">
        <button class="btn btn-primary" onclick="showScreen('login')" id="continue-to-login-btn">Continue to Login</button>
      </div>
    </div>
  </div>`;

INFO['password-updated'] = {
  screen: 'Password Updated',
  role: 'system',
  desc: 'Success confirmation after password reset. Single clear action leads back to login.',
  ia: [
    { title: 'Success Animation', body: 'Shield check icon with pop-in animation' },
    { title: 'Continue to Login', body: 'Returns user to the login screen' },
  ]
};

// ═══════════════════════════════════════════════════════════
//  PATIENT SETUP FLOW (Steps 1 → 6)
// ═══════════════════════════════════════════════════════════

// ─────────────────────────────────────────────
// SCREEN: PATIENT PROFILE SETUP (Step 1)
// ─────────────────────────────────────────────
SCREENS['patient-profile-setup'] = () => `
  <div class="auth-screen">
    ${statusBar('#fff')}
    <div class="auth-back-bar">
      <button class="auth-back-btn" onclick="showScreen('phone-verify')" aria-label="Back">
        ${icon('arrow-left', 18, 'var(--s2b-teal)')} Back
      </button>
    </div>
    <div style="flex:1; overflow-y:auto; scrollbar-width:none; padding:0 28px 40px;">
      ${stepProgress(1, 6)}
      <div class="auth-header" style="padding-top:0; padding-bottom:20px;">
        <div class="auth-icon-wrap blue">${icon('identity', 28, 'var(--s2b-blue)')}</div>
        <div class="auth-title">Set Up Your Profile</div>
        <div class="auth-subtitle">This helps your Safe2Bite care team personalize your experience.</div>
      </div>
      <div class="input-group">
        <label class="input-label" for="ps-fname">First Name</label>
        <div class="input-icon-wrap">
          <span class="input-icon-left">${icon('user', 16, 'var(--text-muted)')}</span>
          <input id="ps-fname" class="input-field verified" type="text" placeholder="First name" value="Alex" aria-label="First Name" />
        </div>
      </div>
      <div class="input-group">
        <label class="input-label" for="ps-lname">Last Name</label>
        <div class="input-icon-wrap">
          <span class="input-icon-left">${icon('user', 16, 'var(--text-muted)')}</span>
          <input id="ps-lname" class="input-field verified" type="text" placeholder="Last name" value="Johnson" aria-label="Last Name" />
        </div>
      </div>
      <div class="input-group">
        <label class="input-label" for="ps-dob">Date of Birth</label>
        <div class="input-icon-wrap">
          <span class="input-icon-left">${icon('date-of-birth', 16, 'var(--text-muted)')}</span>
          <input id="ps-dob" class="input-field" type="text" placeholder="MM / DD / YYYY" aria-label="Date of Birth" />
        </div>
      </div>
      <div class="input-group">
        <label class="input-label" for="ps-preferred">Preferred Name <span style="font-weight:400; color:var(--text-muted);">(optional)</span></label>
        <div class="input-icon-wrap">
          <span class="input-icon-left">${icon('edit', 16, 'var(--text-muted)')}</span>
          <input id="ps-preferred" class="input-field" type="text" placeholder="What should we call you?" aria-label="Preferred Name (optional)" />
        </div>
      </div>
      <div style="margin-bottom:12px;">
        <button class="btn btn-primary" onclick="showScreen('patient-contact-setup')" id="profile-continue-btn">Continue</button>
      </div>
      <div style="text-align:center;">
        <span style="font-size:12px; color:var(--text-muted); cursor:pointer;">Save &amp; Continue Later</span>
      </div>
    </div>
  </div>`;

INFO['patient-profile-setup'] = {
  screen: 'Profile Setup — Step 1 of 6',
  role: 'patient',
  desc: 'First step of patient profile setup. Collects identity information only. Treatment data is not entered here — it comes from the care team.',
  ia: [
    { title: 'Step Progress', body: 'Step 1 of 6 with visual dot indicator' },
    { title: 'First/Last Name', body: 'Pre-populated from account creation where possible' },
    { title: 'Date of Birth', body: 'Required for clinical care coordination' },
    { title: 'Preferred Name', body: 'Optional — personalizes greeting text in the app' },
    { title: 'Continue', body: 'Advances to Contact Information step' },
    { title: 'Save & Continue Later', body: 'Allows pause — data saved to account' },
  ],
  notes: 'IMPORTANT: No clinical or treatment data is collected on this screen. Dosages and treatment plans come exclusively from the authorized Safe2Bite clinical team.'
};

// ─────────────────────────────────────────────
// SCREEN: PATIENT CONTACT SETUP (Step 2)
// ─────────────────────────────────────────────
SCREENS['patient-contact-setup'] = () => `
  <div class="auth-screen">
    ${statusBar('#fff')}
    <div class="auth-back-bar">
      <button class="auth-back-btn" onclick="showScreen('patient-profile-setup')" aria-label="Back">
        ${icon('arrow-left', 18, 'var(--s2b-teal)')} Back
      </button>
    </div>
    <div style="flex:1; overflow-y:auto; scrollbar-width:none; padding:0 28px 40px;">
      ${stepProgress(2, 6)}
      <div class="auth-header" style="padding-top:0; padding-bottom:20px;">
        <div class="auth-icon-wrap teal">${icon('phone', 28, 'var(--s2b-teal)')}</div>
        <div class="auth-title">Your Contact Information</div>
        <div class="auth-subtitle">We'll use this to send you reminders and keep you connected to your care team.</div>
      </div>
      <div style="margin-bottom:10px;">
        <div class="contact-info-row">
          <div class="contact-info-row-left">
            <div style="width:38px; height:38px; background:var(--s2b-teal-light); border-radius:var(--radius-md); display:flex; align-items:center; justify-content:center;">${icon('mail', 18, 'var(--s2b-teal)')}</div>
            <div>
              <div class="contact-info-label">Email Address</div>
              <div class="contact-info-value">alex@email.com</div>
            </div>
          </div>
          <span class="field-status verified">${icon('check-circle', 12, 'var(--s2b-success)')} Verified</span>
        </div>
        <div class="contact-info-row">
          <div class="contact-info-row-left">
            <div style="width:38px; height:38px; background:var(--s2b-teal-light); border-radius:var(--radius-md); display:flex; align-items:center; justify-content:center;">${icon('phone', 18, 'var(--s2b-teal)')}</div>
            <div>
              <div class="contact-info-label">Mobile Number</div>
              <div class="contact-info-value">(555) 012-3456</div>
            </div>
          </div>
          <span class="field-status verified">${icon('check-circle', 12, 'var(--s2b-success)')} Verified</span>
        </div>
      </div>
      <div style="padding:12px 14px; background:var(--s2b-blue-light); border-radius:var(--radius-lg); margin-bottom:24px; display:flex; align-items:flex-start; gap:8px;">
        ${icon('info', 14, 'var(--s2b-blue-mid)')}
        <div style="font-size:12px; color:var(--s2b-blue-mid); line-height:1.55;">Your contact details are used only for care reminders and secure communication with your Safe2Bite team.</div>
      </div>
      <div style="margin-bottom:12px;">
        <button class="btn btn-primary" onclick="showScreen('patient-emergency-contact')" id="contact-continue-btn">Continue</button>
      </div>
      <div style="text-align:center;">
        <span onclick="showScreen('patient-profile-setup')" style="font-size:12px; color:var(--text-muted); cursor:pointer;">Edit Contact Details</span>
      </div>
    </div>
  </div>`;

INFO['patient-contact-setup'] = {
  screen: 'Contact Information — Step 2 of 6',
  role: 'patient',
  desc: 'Shows contact info gathered during account creation with verification status. Users confirm or can edit before proceeding.',
  ia: [
    { title: 'Email Row', body: 'Shows address + Verified badge' },
    { title: 'Phone Row', body: 'Shows number + Verified badge (or Verify action if not yet verified)' },
    { title: 'Privacy Notice', body: 'Explains how contact data is used' },
    { title: 'Continue', body: 'Advances to Emergency Contact step' },
    { title: 'Edit Contact Details', body: 'Returns to profile setup to adjust' },
  ]
};

// ─────────────────────────────────────────────
// SCREEN: EMERGENCY CONTACT (Step 3)
// ─────────────────────────────────────────────
SCREENS['patient-emergency-contact'] = () => `
  <div class="auth-screen">
    ${statusBar('#fff')}
    <div class="auth-back-bar">
      <button class="auth-back-btn" onclick="showScreen('patient-contact-setup')" aria-label="Back">
        ${icon('arrow-left', 18, 'var(--s2b-teal)')} Back
      </button>
    </div>
    <div style="flex:1; overflow-y:auto; scrollbar-width:none; padding:0 28px 40px;">
      ${stepProgress(3, 6)}
      <div class="auth-header" style="padding-top:0; padding-bottom:20px;">
        <div class="auth-icon-wrap blue">${icon('emergency', 28, 'var(--s2b-blue)')}</div>
        <div class="auth-title">Add an Emergency Contact</div>
        <div class="auth-subtitle">Add someone Safe2Bite can identify as your emergency contact.</div>
      </div>
      <div class="input-group">
        <label class="input-label" for="ec-name">Contact Name</label>
        <div class="input-icon-wrap">
          <span class="input-icon-left">${icon('user', 16, 'var(--text-muted)')}</span>
          <input id="ec-name" class="input-field" type="text" placeholder="Full name" aria-label="Emergency Contact Name" />
        </div>
      </div>
      <div class="input-group">
        <label class="input-label" for="ec-rel">Relationship</label>
        <div style="position:relative;">
          ${icon('relationship', 16, 'var(--text-muted)')}
          <select id="ec-rel" class="input-field" aria-label="Relationship" style="appearance:none; padding-left:44px; cursor:pointer; background:white;">
            <option value="" disabled selected>Select relationship</option>
            <option>Parent</option>
            <option>Spouse / Partner</option>
            <option>Sibling</option>
            <option>Family Member</option>
            <option>Friend</option>
            <option>Other</option>
          </select>
          <span style="position:absolute; right:14px; top:50%; transform:translateY(-50%); pointer-events:none;">${icon('chevron', 16, 'var(--text-muted)')}</span>
        </div>
      </div>
      <div class="input-group">
        <label class="input-label" for="ec-phone">Phone Number</label>
        <div class="input-icon-wrap">
          <span class="input-icon-left">${icon('phone', 16, 'var(--text-muted)')}</span>
          <input id="ec-phone" class="input-field" type="tel" placeholder="(555) 000-0000" aria-label="Emergency Contact Phone" />
        </div>
      </div>
      <div style="margin-bottom:12px;">
        <button class="btn btn-primary" onclick="showScreen('patient-consent')" id="save-emergency-btn">Save Contact</button>
      </div>
      <div style="text-align:center;">
        <span onclick="showScreen('patient-consent')" style="font-size:13px; color:var(--text-secondary); cursor:pointer; font-weight:500;">Skip for Now</span>
      </div>
    </div>
  </div>`;

INFO['patient-emergency-contact'] = {
  screen: 'Emergency Contact — Step 3 of 6',
  role: 'patient',
  desc: 'Collects a single emergency contact. Skip is available. This is identification only — not clinical emergency instructions.',
  ia: [
    { title: 'Contact Name', body: 'Full name of emergency contact' },
    { title: 'Relationship', body: 'Dropdown with common options including Other' },
    { title: 'Phone Number', body: 'Mobile or home phone' },
    { title: 'Save Contact', body: 'Saves and advances to Consent & Privacy' },
    { title: 'Skip for Now', body: 'Can be added later in Profile settings' },
  ],
  notes: 'This records who to contact — it does NOT create clinical emergency instructions. Those come from the Safe2Bite care team.'
};

// ─────────────────────────────────────────────
// SCREEN: CONSENT & PRIVACY (Step 4)
// ─────────────────────────────────────────────
SCREENS['patient-consent'] = () => `
  <div class="auth-screen" style="background:var(--surface-base);">
    ${statusBar('var(--surface-base)')}
    <div class="auth-back-bar">
      <button class="auth-back-btn" onclick="showScreen('patient-emergency-contact')" aria-label="Back">
        ${icon('arrow-left', 18, 'var(--s2b-teal)')} Back
      </button>
    </div>
    <div style="flex:1; overflow-y:auto; scrollbar-width:none; padding:0 20px 40px;">
      ${stepProgress(4, 6)}
      <div class="auth-header" style="padding-top:0; padding-bottom:16px;">
        <div class="auth-icon-wrap teal">${icon('consent', 28, 'var(--s2b-teal)')}</div>
        <div class="auth-title">Your Privacy Matters</div>
        <div class="auth-subtitle">Safe2Bite uses your information to support your allergy care and connect you with your care team.</div>
      </div>
      <div class="privacy-item">
        <div class="privacy-item-header">
          <div class="privacy-item-title">${icon('lock', 16, 'var(--s2b-blue)')} Privacy Notice</div>
          <span style="font-size:11px; color:var(--s2b-teal); font-weight:600;">Read</span>
        </div>
        <div class="privacy-item-body">Safe2Bite collects your personal and health information to provide allergy care coordination services. Your data is stored securely and only shared with your authorized care team. You may request deletion of your data at any time.</div>
      </div>
      <div class="privacy-item">
        <div class="privacy-item-header">
          <div class="privacy-item-title">${icon('consent', 16, 'var(--s2b-blue)')} Terms of Use</div>
          <span style="font-size:11px; color:var(--s2b-teal); font-weight:600;">Read</span>
        </div>
        <div class="privacy-item-body">By using Safe2Bite, you agree to use the application only for its intended purpose of allergy care management. Safe2Bite is not a substitute for professional medical advice or emergency services.</div>
      </div>
      <div class="privacy-item">
        <div class="privacy-item-header">
          <div class="privacy-item-title">${icon('info', 16, 'var(--s2b-blue)')} Consent Information</div>
          <span style="font-size:11px; color:var(--s2b-teal); font-weight:600;">Read</span>
        </div>
        <div class="privacy-item-body">You consent to receive communications from Safe2Bite regarding your treatment reminders and care updates. You may update your notification preferences at any time in your profile settings.</div>
      </div>
      <div style="margin:16px 0;">
        <div class="consent-row" id="consent-checkbox-row" onclick="toggleConsent()" role="checkbox" aria-checked="false">
          <div class="consent-checkbox" id="consent-box"></div>
          <div class="consent-text">I have read and agree to the applicable <span class="consent-link">Terms of Use</span>, <span class="consent-link">Privacy Notice</span>, and <span class="consent-link">Consent Information</span>.</div>
        </div>
      </div>
      <div style="margin-bottom:12px;">
        <button class="btn btn-primary" onclick="showScreen('patient-notifications')" id="consent-agree-btn">Agree &amp; Continue</button>
      </div>
    </div>
  </div>`;

INFO['patient-consent'] = {
  screen: 'Consent & Privacy — Step 4 of 6',
  role: 'patient',
  desc: 'Presents Privacy Notice, Terms of Use, and Consent Information as expandable sections. Checkbox is NOT pre-checked. User must actively check before agreeing.',
  ia: [
    { title: 'Privacy Notice', body: 'Expandable — explains data use and deletion rights' },
    { title: 'Terms of Use', body: 'Expandable — usage terms and disclaimers' },
    { title: 'Consent Information', body: 'Expandable — communication consent' },
    { title: 'Consent Checkbox', body: 'NOT pre-checked — must be deliberately selected' },
    { title: 'Agree & Continue', body: 'Only active when checkbox is checked' },
  ],
  notes: 'Consent checkbox is never pre-selected. Legal requirement. Expandable sections keep the screen clean while making content accessible.'
};

// ─────────────────────────────────────────────
// SCREEN: NOTIFICATION PERMISSION (Step 5)
// ─────────────────────────────────────────────
SCREENS['patient-notifications'] = () => `
  <div class="auth-screen">
    ${statusBar('#fff')}
    <div class="auth-back-bar">
      <button class="auth-back-btn" onclick="showScreen('patient-consent')" aria-label="Back">
        ${icon('arrow-left', 18, 'var(--s2b-teal)')} Back
      </button>
    </div>
    <div style="flex:1; overflow-y:auto; scrollbar-width:none; padding:0 28px 40px;">
      ${stepProgress(5, 6)}
      <div class="auth-header" style="padding-top:0; padding-bottom:20px;">
        <div class="auth-icon-wrap teal">${icon('notification-bell', 28, 'var(--s2b-teal)')}</div>
        <div class="auth-title">Stay on Track With Reminders</div>
        <div class="auth-subtitle">Allow notifications so Safe2Bite can remind you about doses, assessments, appointments, and important care-team updates.</div>
      </div>
      <div style="display:flex; flex-direction:column; gap:10px; margin-bottom:24px;">
        <div style="display:flex; align-items:center; gap:12px; padding:14px; background:var(--surface-base); border-radius:var(--radius-lg); border:1px solid var(--border-light);">
          <div style="width:36px; height:36px; background:var(--s2b-teal-light); border-radius:var(--radius-md); display:flex; align-items:center; justify-content:center; flex-shrink:0;">${icon('treatment', 18, 'var(--s2b-teal)')}</div>
          <div style="font-size:13px; color:var(--text-primary); line-height:1.4;"><strong>Dose reminders</strong> — Get notified at the right time each day</div>
        </div>
        <div style="display:flex; align-items:center; gap:12px; padding:14px; background:var(--surface-base); border-radius:var(--radius-lg); border:1px solid var(--border-light);">
          <div style="width:36px; height:36px; background:var(--s2b-blue-light); border-radius:var(--radius-md); display:flex; align-items:center; justify-content:center; flex-shrink:0;">${icon('clipboard', 18, 'var(--s2b-blue)')}</div>
          <div style="font-size:13px; color:var(--text-primary); line-height:1.4;"><strong>Assessment alerts</strong> — Know when a health check-in is due</div>
        </div>
        <div style="display:flex; align-items:center; gap:12px; padding:14px; background:var(--surface-base); border-radius:var(--radius-lg); border:1px solid var(--border-light);">
          <div style="width:36px; height:36px; background:var(--s2b-success-bg); border-radius:var(--radius-md); display:flex; align-items:center; justify-content:center; flex-shrink:0;">${icon('messages', 18, 'var(--s2b-success)')}</div>
          <div style="font-size:13px; color:var(--text-primary); line-height:1.4;"><strong>Care team messages</strong> — Stay informed between appointments</div>
        </div>
        <div style="display:flex; align-items:center; gap:12px; padding:14px; background:var(--surface-base); border-radius:var(--radius-lg); border:1px solid var(--border-light);">
          <div style="width:36px; height:36px; background:var(--s2b-attention-bg); border-radius:var(--radius-md); display:flex; align-items:center; justify-content:center; flex-shrink:0;">${icon('calendar', 18, 'var(--s2b-attention)')}</div>
          <div style="font-size:13px; color:var(--text-primary); line-height:1.4;"><strong>Appointment reminders</strong> — Never miss a scheduled visit</div>
        </div>
      </div>
      <div style="margin-bottom:12px;">
        <button class="btn btn-primary" onclick="showScreen('patient-setup-complete')" id="allow-notif-btn">${icon('notification-bell', 18, 'white')} Allow Notifications</button>
      </div>
      <div style="text-align:center;">
        <span onclick="showScreen('patient-setup-complete')" style="font-size:13px; color:var(--text-secondary); cursor:pointer; font-weight:500;">Not Now</span>
      </div>
      <div style="margin-top:16px; padding:12px 14px; background:var(--surface-base); border-radius:var(--radius-lg); border:1px solid var(--border-light);">
        <div style="font-size:12px; color:var(--text-muted); line-height:1.55;">You can change notification preferences at any time in your profile settings. Safe2Bite will always follow your device settings.</div>
      </div>
    </div>
  </div>`;

INFO['patient-notifications'] = {
  screen: 'Notification Permission — Step 5 of 6',
  role: 'patient',
  desc: 'Pre-permission explanation screen before triggering the OS permission prompt. Shows what types of notifications to expect. Both Allow and Not Now continue the flow.',
  ia: [
    { title: 'Permission Benefits List', body: 'Dose, assessment, messages, appointments — each with icon and description' },
    { title: 'Allow Notifications', body: 'Triggers OS permission dialog in production → then Setup Complete' },
    { title: 'Not Now', body: 'Skips → Setup Complete without requesting permission' },
    { title: 'Settings Note', body: 'Reassures user they can change this any time' },
  ],
  notes: 'The app cannot force notification permissions. This screen leads into the OS dialog. "Not Now" is a valid path.'
};

// ─────────────────────────────────────────────
// SCREEN: SETUP COMPLETE (Step 6)
// ─────────────────────────────────────────────
SCREENS['patient-setup-complete'] = () => `
  <div class="auth-screen" style="background: linear-gradient(180deg, var(--s2b-teal-light) 0%, #fff 60%);">
    ${statusBar('transparent')}
    <div style="flex:1; display:flex; flex-direction:column; align-items:center; justify-content:center; padding:40px 32px;">
      <div style="display:flex; justify-content:center; margin-bottom:24px;">
        <img
          src="https://arokiaitusa.com/wp-content/uploads/2026/09/Safe2Bite-Logo-blue-teal-300x108-1.png"
          alt="Safe2Bite — Texas Food Allergy Care"
          style="width:180px; height:auto; display:block;"
        />
      </div>
      <div style="width:88px; height:88px; border-radius:50%; background:var(--s2b-teal); display:flex; align-items:center; justify-content:center; margin-bottom:24px; box-shadow:0 8px 32px rgba(0,165,187,0.35); animation:success-pop 0.5s cubic-bezier(0.34,1.56,0.64,1);">
        ${icon('check-circle', 44, 'white')}
      </div>
      <div style="font-size:26px; font-weight:800; color:var(--s2b-blue); text-align:center; margin-bottom:12px; line-height:1.25;">You're All Set!</div>
      <div style="font-size:15px; color:var(--text-secondary); text-align:center; line-height:1.65; max-width:280px; margin-bottom:40px;">Your Safe2Bite account is ready. Let's take a look at today's care plan.</div>
      <div style="width:100%;">
        <button class="btn btn-primary" onclick="showScreen('patient-today')" id="go-to-care-plan-btn" style="margin-bottom:12px; font-size:16px; padding:16px 28px;">Go to My Care Plan</button>
      </div>
      <div style="font-size:12px; color:var(--text-muted); text-align:center; margin-top:8px; display:flex; align-items:center; gap:4px;">
        ${icon('shield-check', 14, 'var(--s2b-teal)')} Secured by Safe2Bite
      </div>
    </div>
  </div>`;

INFO['patient-setup-complete'] = {
  screen: 'Setup Complete',
  role: 'patient',
  desc: 'Final onboarding success screen. Matches splash screen aesthetic with teal gradient. Large check icon with pop animation. Single clear CTA to the Today dashboard.',
  ia: [
    { title: 'Safe2Bite Logo', body: 'Actual asset — provided URL' },
    { title: 'Success Circle + Check', body: 'Animated teal circle with white check' },
    { title: 'Go to My Care Plan', body: 'Navigates to patient-today dashboard' },
    { title: 'Secured by Safe2Bite', body: 'Trust signal — shield icon + text' },
  ]
};

// ═══════════════════════════════════════════════════════════
//  CAREGIVER SETUP FLOW
// ═══════════════════════════════════════════════════════════

// ─────────────────────────────────────────────
// SCREEN: CAREGIVER INTRO
// ─────────────────────────────────────────────
SCREENS['caregiver-intro'] = () => `
  <div class="auth-screen">
    ${statusBar('#fff')}
    <div class="auth-back-bar">
      <button class="auth-back-btn" onclick="showScreen('role-select')" aria-label="Back to role selection">
        ${icon('arrow-left', 18, 'var(--s2b-teal)')} Back
      </button>
    </div>
    <div style="flex:1; overflow-y:auto; scrollbar-width:none; padding:0 28px 40px;">
      <div class="auth-header">
        <div class="auth-icon-wrap blue">${icon('role-caregiver', 28, '#5b21b6')}</div>
        <div class="auth-title">Managing Care<br>for Someone?</div>
        <div class="auth-subtitle">A caregiver account lets you manage allergy care for a child or family member enrolled in Safe2Bite treatment.</div>
      </div>
      <div class="clinical-warning">
        <div style="flex-shrink:0; margin-top:2px;">${icon('warning', 16, 'var(--s2b-warning)')}</div>
        <div class="clinical-warning-text"><strong style="display:block; margin-bottom:2px;">Clinical Treatment Note</strong>Treatment information and dosage instructions are managed exclusively by the Safe2Bite care team. Caregivers cannot create or modify clinical treatment data.</div>
      </div>
      <div style="margin-bottom:24px; display:flex; flex-direction:column; gap:12px;">
        <div style="padding:16px; background:var(--surface-base); border-radius:var(--radius-lg); border:1px solid var(--border-light);">
          <div style="font-size:13px; font-weight:700; color:var(--text-dark); margin-bottom:4px; display:flex; align-items:center; gap:8px;">${icon('check-circle', 16, 'var(--s2b-success)')} What you can do</div>
          <ul style="list-style:none; display:flex; flex-direction:column; gap:4px; margin-top:8px;">
            <li style="font-size:12px; color:var(--text-secondary); line-height:1.45;">View treatment schedules and dose reminders</li>
            <li style="font-size:12px; color:var(--text-secondary); line-height:1.45;">Confirm dose completion for your patient</li>
            <li style="font-size:12px; color:var(--text-secondary); line-height:1.45;">Complete health assessments on their behalf</li>
            <li style="font-size:12px; color:var(--text-secondary); line-height:1.45;">View progress and care team messages</li>
          </ul>
        </div>
      </div>
      <div style="margin-bottom:12px;">
        <button class="btn btn-primary" onclick="showScreen('caregiver-who')" id="caregiver-start-btn">Set Up Caregiver Access</button>
      </div>
    </div>
  </div>`;

INFO['caregiver-intro'] = {
  screen: 'Caregiver Introduction',
  role: 'caregiver',
  desc: 'Explains the caregiver role, its capabilities, and its clinical limitations before account setup begins.',
  ia: [
    { title: 'Role Explanation', body: 'Clear description of what caregiver access provides' },
    { title: 'Clinical Warning', body: 'Explicit notice that treatment data is care-team managed only' },
    { title: 'What You Can Do', body: 'Positive framing of caregiver capabilities' },
    { title: 'Set Up Caregiver Access', body: 'Advances to Who Are You Caring For?' },
  ]
};

// ─────────────────────────────────────────────
// SCREEN: WHO ARE YOU CARING FOR?
// ─────────────────────────────────────────────
SCREENS['caregiver-who'] = () => `
  <div class="auth-screen">
    ${statusBar('#fff')}
    <div class="auth-back-bar">
      <button class="auth-back-btn" onclick="showScreen('caregiver-intro')" aria-label="Back">
        ${icon('arrow-left', 18, 'var(--s2b-teal)')} Back
      </button>
    </div>
    <div style="flex:1; overflow-y:auto; scrollbar-width:none; padding:0 28px 40px;">
      <div class="auth-header">
        <div class="auth-icon-wrap blue">${icon('home-heart', 28, 'var(--s2b-blue)')}</div>
        <div class="auth-title">Who Are You Caring For?</div>
        <div class="auth-subtitle">Select your relationship to the patient you'll be managing care for.</div>
      </div>
      <div style="display:flex; flex-direction:column; gap:10px; margin-bottom:24px;">
        <div class="care-option selected" id="care-opt-child" onclick="selectCareOption('child')" role="radio" aria-checked="true">
          <div class="care-option-icon">${icon('user', 20, 'var(--s2b-blue)')}</div>
          <div>
            <div style="font-size:15px; font-weight:700; color:var(--text-dark);">My Child</div>
            <div style="font-size:12px; color:var(--text-secondary); margin-top:2px;">Parent or legal guardian managing a minor's care</div>
          </div>
          <div style="margin-left:auto;">${icon('check-circle', 20, 'var(--s2b-blue)')}</div>
        </div>
        <div class="care-option" id="care-opt-family" onclick="selectCareOption('family')" role="radio" aria-checked="false">
          <div class="care-option-icon">${icon('role-caregiver', 20, 'var(--s2b-blue)')}</div>
          <div>
            <div style="font-size:15px; font-weight:700; color:var(--text-dark);">Family Member</div>
            <div style="font-size:12px; color:var(--text-secondary); margin-top:2px;">Managing care for a spouse, sibling, or relative</div>
          </div>
          <div style="margin-left:auto; opacity:0;">${icon('check-circle', 20, 'var(--s2b-blue)')}</div>
        </div>
        <div class="care-option" id="care-opt-other" onclick="selectCareOption('other')" role="radio" aria-checked="false">
          <div class="care-option-icon">${icon('users', 20, 'var(--s2b-blue)')}</div>
          <div>
            <div style="font-size:15px; font-weight:700; color:var(--text-dark);">Other</div>
            <div style="font-size:12px; color:var(--text-secondary); margin-top:2px;">Authorized person managing care for another individual</div>
          </div>
          <div style="margin-left:auto; opacity:0;">${icon('check-circle', 20, 'var(--s2b-blue)')}</div>
        </div>
      </div>
      <div style="margin-bottom:12px;">
        <button class="btn btn-primary" onclick="showScreen('caregiver-add-patient')" id="care-who-continue-btn">Continue</button>
      </div>
    </div>
  </div>`;

INFO['caregiver-who'] = {
  screen: 'Who Are You Caring For?',
  role: 'caregiver',
  desc: 'Radio-style selection cards for caregiver relationship type. My Child is shown pre-selected as the most common use case.',
  ia: [
    { title: 'My Child', body: 'Parent / guardian — pre-selected' },
    { title: 'Family Member', body: 'Spouse, sibling, relative' },
    { title: 'Other', body: 'Authorized person — requires care team confirmation in production' },
    { title: 'Continue', body: 'Advances to Add Patient screen' },
  ]
};

// ─────────────────────────────────────────────
// SCREEN: ADD PATIENT (Caregiver)
// ─────────────────────────────────────────────
SCREENS['caregiver-add-patient'] = () => `
  <div class="auth-screen">
    ${statusBar('#fff')}
    <div class="auth-back-bar">
      <button class="auth-back-btn" onclick="showScreen('caregiver-who')" aria-label="Back">
        ${icon('arrow-left', 18, 'var(--s2b-teal)')} Back
      </button>
    </div>
    <div style="flex:1; overflow-y:auto; scrollbar-width:none; padding:0 28px 40px;">
      <div class="auth-header">
        <div class="auth-icon-wrap blue">${icon('user-plus', 28, 'var(--s2b-blue)')}</div>
        <div class="auth-title">Add Patient</div>
        <div class="auth-subtitle">Enter your child's information. Your care team will confirm and link the account.</div>
      </div>
      <div class="input-group">
        <label class="input-label" for="ap-fname">Patient First Name</label>
        <div class="input-icon-wrap">
          <span class="input-icon-left">${icon('user', 16, 'var(--text-muted)')}</span>
          <input id="ap-fname" class="input-field" type="text" placeholder="First name" aria-label="Patient First Name" />
        </div>
      </div>
      <div class="input-group">
        <label class="input-label" for="ap-lname">Patient Last Name</label>
        <div class="input-icon-wrap">
          <span class="input-icon-left">${icon('user', 16, 'var(--text-muted)')}</span>
          <input id="ap-lname" class="input-field" type="text" placeholder="Last name" aria-label="Patient Last Name" />
        </div>
      </div>
      <div class="input-group">
        <label class="input-label" for="ap-dob">Date of Birth</label>
        <div class="input-icon-wrap">
          <span class="input-icon-left">${icon('date-of-birth', 16, 'var(--text-muted)')}</span>
          <input id="ap-dob" class="input-field" type="text" placeholder="MM / DD / YYYY" aria-label="Date of Birth" />
        </div>
      </div>
      <div class="input-group">
        <label class="input-label" for="ap-rel">Your Relationship</label>
        <div style="position:relative;">
          <select id="ap-rel" class="input-field" aria-label="Relationship to patient" style="appearance:none; padding-left:44px; cursor:pointer; background:white;">
            <option value="" disabled selected>Select relationship</option>
            <option selected>Parent</option>
            <option>Legal Guardian</option>
            <option>Spouse / Partner</option>
            <option>Sibling</option>
            <option>Family Member</option>
            <option>Authorized Caregiver</option>
          </select>
          <span style="position:absolute; left:14px; top:50%; transform:translateY(-50%); pointer-events:none;">${icon('relationship', 16, 'var(--text-muted)')}</span>
          <span style="position:absolute; right:14px; top:50%; transform:translateY(-50%); pointer-events:none;">${icon('chevron', 16, 'var(--text-muted)')}</span>
        </div>
      </div>
      <div class="clinical-warning">
        <div style="flex-shrink:0;">${icon('info', 16, 'var(--s2b-warning)')}</div>
        <div class="clinical-warning-text">Treatment information and dosage instructions are managed by your Safe2Bite care team. You will not be able to add or change clinical treatment data through this app.</div>
      </div>
      <div style="margin-bottom:12px;">
        <button class="btn btn-primary" onclick="showScreen('caregiver-setup-complete')" id="add-patient-btn">Add Patient</button>
      </div>
    </div>
  </div>`;

INFO['caregiver-add-patient'] = {
  screen: 'Add Patient',
  role: 'caregiver',
  desc: 'Caregiver enters the patient\'s basic information. Clinical data is explicitly excluded. Care team links and confirms the patient record.',
  ia: [
    { title: 'Patient Name + DOB', body: 'Identity only — no clinical data' },
    { title: 'Relationship', body: 'Caregiver relationship to patient' },
    { title: 'Clinical Warning', body: 'Explicit notice that treatment data is care-team managed' },
    { title: 'Add Patient', body: 'Submits for care team linking → Caregiver Setup Complete' },
  ]
};

// ─────────────────────────────────────────────
// SCREEN: CAREGIVER SETUP COMPLETE
// ─────────────────────────────────────────────
SCREENS['caregiver-setup-complete'] = () => `
  <div class="auth-screen" style="background: linear-gradient(180deg, #f0edff 0%, #fff 60%);">
    ${statusBar('transparent')}
    <div style="flex:1; display:flex; flex-direction:column; align-items:center; justify-content:center; padding:40px 32px;">
      <div style="display:flex; justify-content:center; margin-bottom:24px;">
        <img
          src="https://arokiaitusa.com/wp-content/uploads/2026/09/Safe2Bite-Logo-blue-teal-300x108-1.png"
          alt="Safe2Bite — Texas Food Allergy Care"
          style="width:180px; height:auto; display:block;"
        />
      </div>
      <div style="width:88px; height:88px; border-radius:50%; background:#5b21b6; display:flex; align-items:center; justify-content:center; margin-bottom:24px; box-shadow:0 8px 32px rgba(91,33,182,0.3); animation:success-pop 0.5s cubic-bezier(0.34,1.56,0.64,1);">
        ${icon('role-caregiver', 44, 'white')}
      </div>
      <div style="font-size:26px; font-weight:800; color:var(--s2b-blue); text-align:center; margin-bottom:12px; line-height:1.25;">Caregiver Account Ready</div>
      <div style="font-size:14px; color:var(--text-secondary); text-align:center; line-height:1.65; max-width:280px; margin-bottom:12px;">Your caregiver account is set up. Your Safe2Bite care team will confirm the patient link and notify you when it's ready.</div>
      <div style="padding:12px 16px; background:var(--s2b-attention-bg); border-radius:var(--radius-lg); margin-bottom:32px; border:1px solid #ffe082; text-align:center;">
        <div style="font-size:12px; color:var(--s2b-warning); line-height:1.55;">${icon('bell', 14, 'var(--s2b-attention)')} You'll receive a notification once your patient account link is confirmed.</div>
      </div>
      <div style="width:100%;">
        <button class="btn btn-primary" onclick="showScreen('caregiver-home')" id="caregiver-go-home-btn" style="margin-bottom:12px;">Go to My Patients</button>
      </div>
    </div>
  </div>`;

INFO['caregiver-setup-complete'] = {
  screen: 'Caregiver Setup Complete',
  role: 'caregiver',
  desc: 'Caregiver setup success screen with purple accent reflecting caregiver role color. Clearly communicates that care team confirmation is still pending.',
  ia: [
    { title: 'Success Animation', body: 'Purple caregiver icon circle with pop animation' },
    { title: 'Pending Link Notice', body: 'Care team must confirm the patient link — honest about async process' },
    { title: 'Go to My Patients', body: 'Advances to the Caregiver Home screen' },
  ]
};

// ═══════════════════════════════════════════════════════════
//  SYSTEM STATES
// ═══════════════════════════════════════════════════════════

// ─────────────────────────────────────────────
// SCREEN: ERROR — INVALID LOGIN
// ─────────────────────────────────────────────
SCREENS['error-invalid-login'] = () => `
  <div class="auth-screen">
    ${statusBar('#fff')}
    <div class="auth-back-bar">
      <button class="auth-back-btn" onclick="showScreen('login')" aria-label="Back to Login">
        ${icon('arrow-left', 18, 'var(--s2b-teal)')} Back to Login
      </button>
    </div>
    <div style="padding:20px 28px 40px;">
      <div style="margin-bottom:32px; text-align:center; padding-top:16px;">
        <div style="width:52px; height:52px; background:var(--s2b-teal-light); border-radius:14px; display:flex; align-items:center; justify-content:center; margin:0 auto 12px;">${icon('shield-check', 28, 'var(--s2b-teal)')}</div>
        <div style="font-size:26px; font-weight:800; color:var(--s2b-blue);">Welcome</div>
        <div style="font-size:13px; color:var(--text-secondary); margin-top:4px;">Sign in to your Safe2Bite account</div>
      </div>
      <div class="input-group">
        <label class="input-label" for="err-email">Email Address</label>
        <div class="input-icon-wrap">
          <span class="input-icon-left">${icon('mail', 16, 'var(--s2b-urgent)')}</span>
          <input id="err-email" class="input-field error" type="email" value="alex@email.com" aria-label="Email Address" aria-describedby="login-error-msg" />
        </div>
      </div>
      <div class="input-group">
        <label class="input-label" for="err-pw">Password</label>
        <div class="input-icon-wrap">
          <span class="input-icon-left">${icon('lock', 16, 'var(--s2b-urgent)')}</span>
          <input id="err-pw" class="input-field error" type="password" placeholder="••••••••" aria-label="Password" />
        </div>
        <div class="input-error-msg" id="login-error-msg" role="alert">
          ${icon('alert-circle', 14, 'var(--s2b-urgent)')}
          That email and password combination doesn't match. Please check and try again.
        </div>
      </div>
      <div style="text-align:right; margin-bottom:24px;">
        <span onclick="showScreen('forgot-password')" style="font-size:13px; color:var(--s2b-teal); font-weight:600; cursor:pointer;">Forgot Password?</span>
      </div>
      <button class="btn btn-primary" onclick="showScreen('patient-today')" id="err-login-btn" style="margin-bottom:12px;">Try Again</button>
      <div style="padding:12px 14px; background:var(--s2b-urgent-bg); border-radius:var(--radius-lg); border:1px solid #ef9a9a; display:flex; align-items:flex-start; gap:8px;">
        ${icon('info', 14, 'var(--s2b-urgent)')}
        <div style="font-size:12px; color:var(--s2b-urgent); line-height:1.55;">After several failed attempts, your account may be temporarily locked for security. Use Forgot Password to reset access.</div>
      </div>
    </div>
  </div>`;

INFO['error-invalid-login'] = {
  screen: 'Error — Invalid Login',
  role: 'system',
  desc: 'Login screen with error state. Red-bordered fields, inline friendly error message, and helpful guidance about account lockout.',
  ia: [
    { title: 'Red Field Borders', body: 'Visual error state on both fields' },
    { title: 'Inline Error Message', body: 'Clear, non-technical, friendly wording' },
    { title: 'Security Notice', body: 'Warns about lockout without alarm — explains forgot password path' },
    { title: 'Forgot Password', body: 'Prominent escape path for locked users' },
  ]
};

// ─────────────────────────────────────────────
// SCREEN: ERROR — INVALID VERIFICATION CODE
// ─────────────────────────────────────────────
SCREENS['error-invalid-code'] = () => `
  <div class="auth-screen">
    ${statusBar('#fff')}
    <div class="auth-back-bar">
      <button class="auth-back-btn" onclick="showScreen('email-verify')" aria-label="Back">
        ${icon('arrow-left', 18, 'var(--s2b-teal)')} Back
      </button>
    </div>
    <div style="flex:1; overflow-y:auto; scrollbar-width:none; padding:0 28px 40px;">
      <div class="auth-header">
        <div class="auth-icon-wrap" style="background:var(--s2b-urgent-bg);">${icon('x-circle', 28, 'var(--s2b-urgent)')}</div>
        <div class="auth-title">Verification Failed</div>
        <div class="auth-subtitle">We sent a 6-digit code to<br><strong style="color:var(--s2b-blue);">alex@email.com</strong></div>
      </div>
      ${otpBoxes(3, true)}
      <div style="text-align:center; margin-bottom:16px;">
        <div class="input-error-msg" style="justify-content:center;" role="alert">
          ${icon('alert-circle', 14, 'var(--s2b-urgent)')}
          That code doesn't look right. Please check the code and try again.
        </div>
      </div>
      <div class="resend-row">
        <span>Didn't receive the code?</span>
        <button class="resend-link">${icon('refresh', 14, 'var(--s2b-teal)')} Resend Code</button>
      </div>
      <div style="margin-top:20px;">
        <button class="btn btn-primary" onclick="showScreen('email-verify')" id="retry-code-btn">Try Again</button>
      </div>
    </div>
  </div>`;

INFO['error-invalid-code'] = {
  screen: 'Error — Invalid Verification Code',
  role: 'system',
  desc: 'Verification error state. All OTP boxes turn red. Friendly error message with resend option. No developer error codes shown.',
  ia: [
    { title: 'Red OTP Boxes', body: 'All 6 boxes show error state together' },
    { title: 'Friendly Error', body: '"That code doesn\'t look right" — human language' },
    { title: 'Resend Code', body: 'Easy recovery path' },
    { title: 'Try Again', body: 'Clears boxes and restores to normal state in production' },
  ]
};

// ─────────────────────────────────────────────
// SCREEN: ERROR — ACCOUNT ALREADY EXISTS
// ─────────────────────────────────────────────
SCREENS['error-account-exists'] = () => `
  <div class="auth-screen">
    ${statusBar('#fff')}
    <div class="auth-back-bar">
      <button class="auth-back-btn" onclick="showScreen('create-account')" aria-label="Back">
        ${icon('arrow-left', 18, 'var(--s2b-teal)')} Back
      </button>
    </div>
    <div style="padding:40px 28px;">
      <div class="error-screen-block" style="padding-top:16px;">
        <div class="error-icon-circle soft-yellow">
          ${icon('alert-circle', 32, 'var(--s2b-attention)')}
        </div>
        <div class="error-title">Account Already Exists</div>
        <div class="error-body">An account with <strong>alex@email.com</strong> is already registered with Safe2Bite. Would you like to sign in or reset your password?</div>
        <div style="width:100%; display:flex; flex-direction:column; gap:12px;">
          <button class="btn btn-primary" onclick="showScreen('login')" id="exists-login-btn">Log In to Existing Account</button>
          <button class="btn btn-secondary" onclick="showScreen('forgot-password')" id="exists-reset-btn" style="width:100%;">Reset Password</button>
          <button onclick="showScreen('create-account')" class="btn btn-text" style="color:var(--text-secondary);">Use a Different Email</button>
        </div>
      </div>
    </div>
  </div>`;

INFO['error-account-exists'] = {
  screen: 'Error — Account Already Exists',
  role: 'system',
  desc: 'Friendly error when a user tries to register with an email that already exists. Provides clear paths to login or reset password.',
  ia: [
    { title: 'Yellow Warning Icon', body: 'Attention — not urgent red, this is recoverable' },
    { title: 'Affected Email', body: 'Shows exactly which email the error relates to' },
    { title: 'Log In', body: 'Primary CTA — most users just forgot they have an account' },
    { title: 'Reset Password', body: 'If they forgot their password' },
    { title: 'Use Different Email', body: 'If the email genuinely belongs to someone else' },
  ]
};

// ─────────────────────────────────────────────
// SCREEN: ERROR — NETWORK UNAVAILABLE
// ─────────────────────────────────────────────
SCREENS['error-network'] = () => `
  <div class="auth-screen" style="background:var(--surface-base);">
    ${statusBar('var(--surface-base)')}
    <div style="padding:40px 28px;">
      <div class="error-screen-block" style="padding-top:40px;">
        <div class="error-icon-circle soft-grey">
          ${icon('wifi-off', 32, 'var(--text-muted)')}
        </div>
        <div class="error-title">No Connection</div>
        <div class="error-body">Safe2Bite can't connect right now. Please check your internet connection and try again.</div>
        <div style="width:100%; display:flex; flex-direction:column; gap:12px;">
          <button class="btn btn-primary" id="network-retry-btn">${icon('refresh', 18, 'white')} Try Again</button>
        </div>
      </div>
      <div style="margin-top:32px; padding:14px; background:var(--surface-card); border-radius:var(--radius-lg); border:1px solid var(--border-light);">
        <div style="font-size:12px; color:var(--text-secondary); line-height:1.6; text-align:center;">If the problem continues, please contact Safe2Bite support at<br><span style="color:var(--s2b-teal); font-weight:600;">support@safe2bitetexasfoodallergy.com</span></div>
      </div>
    </div>
  </div>`;

INFO['error-network'] = {
  screen: 'Error — Network Unavailable',
  role: 'system',
  desc: 'Shown when the app cannot connect to Safe2Bite servers. Calm, grey tone — not alarming. Provides retry and support contact.',
  ia: [
    { title: 'Grey WiFi-Off Icon', body: 'Visual indicator without alarm — not red' },
    { title: 'Try Again', body: 'Retries connection — spinning in production' },
    { title: 'Support Contact', body: 'Fallback to human support with actual email address' },
  ]
};

// ─────────────────────────────────────────────
// SCREEN: LOADING STATE
// ─────────────────────────────────────────────
SCREENS['state-loading'] = () => `
  <div class="auth-screen">
    ${statusBar('#fff')}
    <div style="padding:20px 28px 40px; display:flex; flex-direction:column; min-height:calc(780px - 44px);">
      <div style="font-size:11px; font-weight:700; color:var(--text-secondary); letter-spacing:0.08em; text-transform:uppercase; margin-bottom:20px; padding-top:8px;">Loading State Examples</div>
      <div style="display:flex; flex-direction:column; gap:16px;">
        <div>
          <div style="font-size:11px; color:var(--text-muted); margin-bottom:8px; font-weight:600; text-transform:uppercase; letter-spacing:0.06em;">Button Loading States</div>
          <div style="display:flex; flex-direction:column; gap:10px;">
            <button class="btn btn-primary btn-loading" style="cursor:not-allowed;">
              <div class="btn-spinner"></div>
              Creating Account...
            </button>
            <button class="btn btn-primary btn-loading" style="cursor:not-allowed;">
              <div class="btn-spinner"></div>
              Signing In...
            </button>
            <button class="btn btn-primary btn-loading" style="cursor:not-allowed;">
              <div class="btn-spinner"></div>
              Verifying...
            </button>
            <button class="btn btn-primary btn-loading" style="cursor:not-allowed;">
              <div class="btn-spinner"></div>
              Saving Profile...
            </button>
          </div>
        </div>
        <div>
          <div style="font-size:11px; color:var(--text-muted); margin-bottom:8px; font-weight:600; text-transform:uppercase; letter-spacing:0.06em;">Skeleton Loading</div>
          <div style="display:flex; flex-direction:column; gap:8px;">
            <div class="skeleton" style="height:18px; width:60%;"></div>
            <div class="skeleton" style="height:14px; width:90%;"></div>
            <div class="skeleton" style="height:14px; width:75%;"></div>
            <div style="height:12px;"></div>
            <div class="skeleton" style="height:52px; border-radius:var(--radius-md);"></div>
            <div class="skeleton" style="height:52px; border-radius:var(--radius-md);"></div>
            <div class="skeleton" style="height:52px; border-radius:var(--radius-md);"></div>
          </div>
        </div>
      </div>
    </div>
  </div>`;

INFO['state-loading'] = {
  screen: 'Loading State',
  role: 'system',
  desc: 'Reference screen showing all loading state patterns: button loading with spinner, and skeleton screens for form and content loading.',
  ia: [
    { title: 'Button Loading', body: 'Spinner + text like "Creating Account…" replaces normal button text' },
    { title: 'Skeleton Rows', body: 'Animated shimmer placeholders for loading content areas' },
  ],
  notes: 'Loading states prevent user uncertainty about whether their action was received. All major actions use these patterns.'
};

// ─────────────────────────────────────────────
// SCREEN: SUCCESS STATE
// ─────────────────────────────────────────────
SCREENS['state-success'] = () => `
  <div class="auth-screen">
    ${statusBar('#fff')}
    <div style="padding:20px 28px 40px;">
      <div style="font-size:11px; font-weight:700; color:var(--text-secondary); letter-spacing:0.08em; text-transform:uppercase; margin-bottom:20px; padding-top:8px;">Success State Examples</div>
      <div style="display:flex; flex-direction:column; gap:12px;">
        <div style="display:flex; align-items:center; gap:12px; padding:14px; background:var(--s2b-success-bg); border-radius:var(--radius-lg); border:1px solid #a7d7be;">
          ${icon('check-circle', 22, 'var(--s2b-success)')}
          <div>
            <div style="font-size:14px; font-weight:700; color:var(--s2b-success);">Email Verified</div>
            <div style="font-size:12px; color:var(--text-secondary);">Your email address has been confirmed.</div>
          </div>
        </div>
        <div style="display:flex; align-items:center; gap:12px; padding:14px; background:var(--s2b-success-bg); border-radius:var(--radius-lg); border:1px solid #a7d7be;">
          ${icon('check-circle', 22, 'var(--s2b-success)')}
          <div>
            <div style="font-size:14px; font-weight:700; color:var(--s2b-success);">Account Created</div>
            <div style="font-size:12px; color:var(--text-secondary);">Welcome to Safe2Bite, Alex!</div>
          </div>
        </div>
        <div style="display:flex; align-items:center; gap:12px; padding:14px; background:var(--s2b-success-bg); border-radius:var(--radius-lg); border:1px solid #a7d7be;">
          ${icon('shield-check', 22, 'var(--s2b-success)')}
          <div>
            <div style="font-size:14px; font-weight:700; color:var(--s2b-success);">Password Updated</div>
            <div style="font-size:12px; color:var(--text-secondary);">Your new password is active.</div>
          </div>
        </div>
        <div style="display:flex; align-items:center; gap:12px; padding:14px; background:var(--s2b-success-bg); border-radius:var(--radius-lg); border:1px solid #a7d7be;">
          ${icon('user-check', 22, 'var(--s2b-success)')}
          <div>
            <div style="font-size:14px; font-weight:700; color:var(--s2b-success);">Profile Saved</div>
            <div style="font-size:12px; color:var(--text-secondary);">Your information has been saved securely.</div>
          </div>
        </div>
        <div style="margin-top:8px;">
          <div style="font-size:11px; color:var(--text-muted); margin-bottom:8px; font-weight:600; text-transform:uppercase; letter-spacing:0.06em;">Full-Page Success</div>
          <div style="padding:28px 20px; background:var(--s2b-success-bg); border-radius:var(--radius-xl); border:1px solid #a7d7be; text-align:center;">
            <div style="width:64px; height:64px; border-radius:50%; background:var(--s2b-success); display:flex; align-items:center; justify-content:center; margin:0 auto 16px; animation:success-pop 0.4s cubic-bezier(0.34,1.56,0.64,1);">${icon('check-circle', 32, 'white')}</div>
            <div style="font-size:18px; font-weight:800; color:var(--s2b-blue); margin-bottom:6px;">All Done!</div>
            <div style="font-size:13px; color:var(--text-secondary);">Your changes have been saved successfully.</div>
          </div>
        </div>
      </div>
    </div>
  </div>`;

INFO['state-success'] = {
  screen: 'Success State',
  role: 'system',
  desc: 'Reference screen showing all success state patterns: inline success banners and full-page success blocks. Uses icon + text — never color alone.',
  ia: [
    { title: 'Inline Success Banner', body: 'Green background, check icon, title + subtitle' },
    { title: 'Full-Page Success Block', body: 'Animated circle icon + message for major milestones' },
  ],
  notes: 'All success states use BOTH icon AND text — never color alone. Accessible for color-blind users.'
};

// ─────────────────────────────────────────────
// HELPER: Consent checkbox toggle
// ─────────────────────────────────────────────
function toggleConsent() {
  const box = document.getElementById('consent-box');
  const row = document.getElementById('consent-checkbox-row');
  if (!box) return;
  const isChecked = box.classList.toggle('checked');
  row.setAttribute('aria-checked', isChecked ? 'true' : 'false');
  const checkMark = box.innerHTML;
  box.innerHTML = isChecked ? `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>` : '';
}

// ─────────────────────────────────────────────
// NAVIGATION CONTROLLER
// ─────────────────────────────────────────────

function showScreen(id) {
  const phoneScreen = document.getElementById('phone-screen');
  const infoContent = document.getElementById('info-content');
  const screenLabel = document.getElementById('screen-label');

  // Remove active from all nav items
  document.querySelectorAll('.screen-nav-item').forEach(b => b.classList.remove('active'));

  // Activate nav item
  const navBtn = document.getElementById('nav-' + id);
  if (navBtn) navBtn.classList.add('active');

  // Render screen
  if (SCREENS[id]) {
    phoneScreen.innerHTML = SCREENS[id]();
  } else {
    phoneScreen.innerHTML = `<div style="padding:80px 32px; text-align:center; color:var(--text-secondary);">
      <div style="font-size:48px; margin-bottom:16px;">🚧</div>
      <div style="font-size:16px; font-weight:700; color:var(--text-dark); margin-bottom:8px;">Screen Not Yet Defined</div>
      <div style="font-size:13px;">This screen will be designed in a future pass.</div>
    </div>`;
  }

  // Render info panel
  const info = INFO[id];
  if (info) {
    const roleColors = { patient: 'patient', caregiver: 'caregiver', doctor: 'doctor', system: 'system' };
    const roleLabels = { patient: '🧑 Patient', caregiver: '👨‍👩‍👧 Caregiver', doctor: '🩺 Doctor / Care Team', system: '⚙️ System / App Shell' };
    infoContent.innerHTML = `
      <div class="info-section-title">Screen Details</div>
      <div class="info-screen-name">${info.screen}</div>
      <div class="info-role-badge ${info.role}">${roleLabels[info.role] || info.role}</div>
      <div class="info-description">${info.desc || ''}</div>
      
      ${info.ia && info.ia.length > 0 ? `
        <div class="info-section-title" style="margin-top:16px;">Information Architecture</div>
        <ul class="info-ia-list">
          ${info.ia.map(i => `<li><strong>${i.title}</strong>${i.body}</li>`).join('')}
        </ul>` : ''}
      
      ${info.notes ? `
        <div class="info-section-title" style="margin-top:16px;">Designer Notes</div>
        <div class="info-note">${info.notes}</div>` : ''}
      
      <div class="info-section-title" style="margin-top:16px;">Pass 2 Status</div>
      <div class="info-note" style="background:#1a2a3a; border-color:#2a3a4a; color:#6b9abf;">
        Pass 2 Complete — Authentication + Onboarding<br>
        28 new screens added and wired<br>
        Pass 1 screens preserved unchanged
      </div>
    `;
  } else {
    infoContent.innerHTML = `<div class="info-section-title">Screen Details</div><div class="info-description" style="color:#4b5563;">Select a screen to see details.</div>`;
  }

  // Update label
  screenLabel.textContent = info ? info.screen : id;

  // Reset scroll
  phoneScreen.scrollTop = 0;
}

// ─────────────────────────────────────────────
// INIT
// ─────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  showScreen('splash');
});
