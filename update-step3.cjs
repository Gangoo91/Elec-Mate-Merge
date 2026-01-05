const fs = require('fs');
const filePath = 'src/pages/college/CollegeDashboard.tsx';
let content = fs.readFileSync(filePath, 'utf8');

// Step 3: Add useNavigate hook in component
if (!content.includes('const navigate = useNavigate()')) {
  content = content.replace(
    'const [activeSection, setActiveSection] = useState<CollegeSection>("overview");',
    'const navigate = useNavigate();\n  const [activeSection, setActiveSection] = useState<CollegeSection>("overview");'
  );
}

// Step 4: Add handleGoHome function after handleBack
const handleGoHome = `

  const handleGoHome = useCallback(() => {
    navigate("/");
  }, [navigate]);
`;

if (!content.includes('handleGoHome')) {
  content = content.replace(
    '}, [activeSection]);\n\n  const renderSection',
    '}, [activeSection]);' + handleGoHome + '\n  const renderSection'
  );
}

fs.writeFileSync(filePath, content);
console.log('Step 3 done - useNavigate and handleGoHome added');
