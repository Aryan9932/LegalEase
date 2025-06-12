import fs from 'fs';
import path from 'path';
import handlebars from 'handlebars';
import pdf from 'html-pdf';

export const generateAgreement = async (req, res) => {
  try {
    // 🪵 Debug log to inspect incoming request
    console.log("Received body:", req.body);

    // ✅ Validate required fields
    if (!req.body || !req.body.type || !req.body.formData) {
      return res.status(400).json({ message: 'Missing type or formData in request body' });
    }

    const { type, formData } = req.body;

    // ✅ Path to the template
    const __dirname = path.resolve();
    const templatePath = path.join(__dirname, 'templates', `${type}.hbs`);

    if (!fs.existsSync(templatePath)) {
      return res.status(400).json({ message: 'Invalid agreement type or missing template file' });
    }

    // ✅ Compile the template
    const source = fs.readFileSync(templatePath, 'utf-8');
    const template = handlebars.compile(source);
    const html = template(formData);

    // ✅ PDF options
    const options = {
      format: 'A4',
      border: '10mm'
    };

    // ✅ Generate and send PDF
    pdf.create(html, options).toBuffer((err, buffer) => {
      if (err) {
        console.error("PDF generation error:", err);
        return res.status(500).send("PDF generation failed");
      }

      res.setHeader('Content-Type', 'application/pdf');
      res.send(buffer);
    });

  } catch (err) {
    console.error("Catch Error:", err);
    res.status(500).json({ message: 'Internal server error' });
  }
};
