import fs from 'fs';
import path from 'path';

// Helper to get submissions file path
const getSubmissionsFilePath = () => {
  return path.join(process.cwd(), 'data', 'submissions.json');
};

// Helper to read submissions
const readSubmissions = () => {
  const filePath = getSubmissionsFilePath();
  try {
    if (!fs.existsSync(filePath)) {
      // Create data directory and file if they don't exist
      const dataDir = path.join(process.cwd(), 'data');
      if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
      }
      fs.writeFileSync(filePath, JSON.stringify([]));
      return [];
    }
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading submissions:', error);
    return [];
  }
};

// Helper to write submissions
const writeSubmissions = (submissions) => {
  const filePath = getSubmissionsFilePath();
  try {
    fs.writeFileSync(filePath, JSON.stringify(submissions, null, 2));
  } catch (error) {
    console.error('Error writing submissions:', error);
    throw error;
  }
};

export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, email, strudelLink, description } = req.body;

    // Validation
    if (!name || !email || !strudelLink) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email address' });
    }

    // Validate Strudel link
    if (!strudelLink.includes('strudel.cc')) {
      return res.status(400).json({ error: 'Invalid Strudel link' });
    }

    // Create submission object
    const submission = {
      id: Date.now().toString(),
      name,
      email,
      strudelLink,
      description: description || '',
      status: 'pending', // pending, approved, rejected
      submittedAt: new Date().toISOString(),
      rejectionReason: null,
      rejectedAt: null,
    };

    // Read existing submissions
    const submissions = readSubmissions();

    // Add new submission
    submissions.push(submission);

    // Write back to file
    writeSubmissions(submissions);

    return res.status(201).json({
      success: true,
      message: 'Submission received successfully!',
      submissionId: submission.id
    });

  } catch (error) {
    console.error('Submission error:', error);
    return res.status(500).json({ error: 'Failed to process submission' });
  }
}