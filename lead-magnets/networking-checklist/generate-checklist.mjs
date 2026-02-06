import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// LUME Brand Colors
const COLORS = {
    coral: rgb(255/255, 81/255, 73/255),
    coralDark: rgb(232/255, 68/255, 61/255),
    charcoal: rgb(26/255, 26/255, 26/255),
    darkGray: rgb(43/255, 50/255, 58/255),
    gray: rgb(107/255, 107/255, 107/255),
    lightGray: rgb(240/255, 240/255, 240/255),
    white: rgb(1, 1, 1),
    cream: rgb(250/255, 250/255, 250/255),
};

// A4 dimensions
const PAGE_WIDTH = 595;
const PAGE_HEIGHT = 842;
const MARGIN = 40;

async function createChecklist() {
    const pdfDoc = await PDFDocument.create();

    const helvetica = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const helveticaBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
    const timesRoman = await pdfDoc.embedFont(StandardFonts.TimesRoman);
    const timesBold = await pdfDoc.embedFont(StandardFonts.TimesRomanBold);
    const timesItalic = await pdfDoc.embedFont(StandardFonts.TimesRomanItalic);

    const page = pdfDoc.addPage([PAGE_WIDTH, PAGE_HEIGHT]);

    // Header bar
    page.drawRectangle({
        x: 0, y: PAGE_HEIGHT - 70,
        width: PAGE_WIDTH, height: 70,
        color: COLORS.charcoal
    });

    // Coral accent line
    page.drawRectangle({
        x: 0, y: PAGE_HEIGHT - 74,
        width: PAGE_WIDTH, height: 4,
        color: COLORS.coral
    });

    // Header text
    page.drawText('LUME', {
        x: MARGIN,
        y: PAGE_HEIGHT - 45,
        size: 18,
        font: timesBold,
        color: COLORS.white
    });

    page.drawText('THE HIGH-VALUE NETWORKING CHECKLIST', {
        x: PAGE_WIDTH - MARGIN - 260,
        y: PAGE_HEIGHT - 45,
        size: 12,
        font: helveticaBold,
        color: COLORS.coral
    });

    let y = PAGE_HEIGHT - 110;

    // Intro text
    page.drawText('Use this checklist before, during, and after every networking interaction.', {
        x: MARGIN,
        y: y,
        size: 11,
        font: timesItalic,
        color: COLORS.gray
    });

    y -= 35;

    // ============== BEFORE SECTION ==============
    page.drawRectangle({
        x: MARGIN, y: y - 22,
        width: PAGE_WIDTH - (MARGIN * 2), height: 26,
        color: COLORS.coral
    });

    page.drawText('BEFORE', {
        x: MARGIN + 12,
        y: y - 15,
        size: 12,
        font: helveticaBold,
        color: COLORS.white
    });

    page.drawText('Preparation is 80% of success', {
        x: MARGIN + 80,
        y: y - 15,
        size: 10,
        font: helvetica,
        color: COLORS.white
    });

    y -= 40;

    const beforeItems = [
        ['Research attendees/host', 'Know who will be there and what they do'],
        ['Prepare 2-3 talking points', 'Topics you can speak knowledgeably about'],
        ['Set a connection goal', 'Aim for 2-3 quality conversations, not 10 cards'],
        ['Prepare your intro', '10 seconds: name, what you do, one interesting hook'],
        ['Think about what you can give', 'Intros, insights, resources you can offer'],
        ['Dress appropriately', 'Match the context; when in doubt, overdress slightly'],
    ];

    for (const [item, note] of beforeItems) {
        // Checkbox
        page.drawRectangle({
            x: MARGIN,
            y: y - 12,
            width: 14,
            height: 14,
            borderColor: COLORS.coral,
            borderWidth: 1.5,
            color: COLORS.white
        });

        page.drawText(item, {
            x: MARGIN + 22,
            y: y - 9,
            size: 11,
            font: helveticaBold,
            color: COLORS.charcoal
        });

        page.drawText(note, {
            x: MARGIN + 22,
            y: y - 22,
            size: 9,
            font: helvetica,
            color: COLORS.gray
        });

        y -= 32;
    }

    y -= 10;

    // ============== DURING SECTION ==============
    page.drawRectangle({
        x: MARGIN, y: y - 22,
        width: PAGE_WIDTH - (MARGIN * 2), height: 26,
        color: COLORS.charcoal
    });

    page.drawText('DURING', {
        x: MARGIN + 12,
        y: y - 15,
        size: 12,
        font: helveticaBold,
        color: COLORS.coral
    });

    page.drawText('Quality over quantity', {
        x: MARGIN + 80,
        y: y - 15,
        size: 10,
        font: helvetica,
        color: COLORS.white
    });

    y -= 40;

    const duringItems = [
        ['Ask open-ended questions', '"What are you working on?" "What brought you here?"'],
        ['Listen more than you talk', 'Aim for 70% listening, 30% talking'],
        ['Find common ground', 'Shared interests, challenges, or connections'],
        ['Take mental notes', 'Remember details to reference in follow-up'],
        ['Offer value first', 'Share an insight, make an intro, recommend a resource'],
        ['Exchange contact info properly', 'Phone + context, not just business cards'],
        ['End conversations gracefully', '"Let me not keep you - great meeting you"'],
        ['Introduce people to each other', 'Be a connector, not just a collector'],
    ];

    for (const [item, note] of duringItems) {
        page.drawRectangle({
            x: MARGIN,
            y: y - 12,
            width: 14,
            height: 14,
            borderColor: COLORS.charcoal,
            borderWidth: 1.5,
            color: COLORS.white
        });

        page.drawText(item, {
            x: MARGIN + 22,
            y: y - 9,
            size: 11,
            font: helveticaBold,
            color: COLORS.charcoal
        });

        page.drawText(note, {
            x: MARGIN + 22,
            y: y - 22,
            size: 9,
            font: helvetica,
            color: COLORS.gray
        });

        y -= 32;
    }

    y -= 10;

    // ============== AFTER SECTION ==============
    page.drawRectangle({
        x: MARGIN, y: y - 22,
        width: PAGE_WIDTH - (MARGIN * 2), height: 26,
        color: COLORS.coral
    });

    page.drawText('AFTER', {
        x: MARGIN + 12,
        y: y - 15,
        size: 12,
        font: helveticaBold,
        color: COLORS.white
    });

    page.drawText('This is where relationships are built', {
        x: MARGIN + 70,
        y: y - 15,
        size: 10,
        font: helvetica,
        color: COLORS.white
    });

    y -= 40;

    const afterItems = [
        ['Send follow-up within 48 hours', '"Great meeting you at [event]. Enjoyed our chat about [topic]"'],
        ['Reference something specific', 'Show you were paying attention'],
        ['Deliver on any promises', 'If you said you would send something, do it'],
        ['Add them to your CRM/notes', 'Date met, context, interests, follow-up plan'],
        ['Connect them with someone', 'Make an intro within 2 weeks if appropriate'],
        ['Schedule a 1:1 coffee/call', 'Move from event contact to real relationship'],
        ['Add to 90-day nurture cycle', 'Light touch every 3-4 weeks'],
    ];

    for (const [item, note] of afterItems) {
        page.drawRectangle({
            x: MARGIN,
            y: y - 12,
            width: 14,
            height: 14,
            borderColor: COLORS.coral,
            borderWidth: 1.5,
            color: COLORS.white
        });

        page.drawText(item, {
            x: MARGIN + 22,
            y: y - 9,
            size: 11,
            font: helveticaBold,
            color: COLORS.charcoal
        });

        // Truncate long notes for better fit
        const truncatedNote = note.length > 70 ? note.substring(0, 67) + '...' : note;
        page.drawText(truncatedNote, {
            x: MARGIN + 22,
            y: y - 22,
            size: 9,
            font: helvetica,
            color: COLORS.gray
        });

        y -= 32;
    }

    // Footer
    page.drawRectangle({
        x: 0, y: 0,
        width: PAGE_WIDTH, height: 50,
        color: COLORS.lightGray
    });

    page.drawText('Want the complete system? Get the full HNI Networking Playbook at thelumeproject.com', {
        x: MARGIN,
        y: 20,
        size: 9,
        font: helvetica,
        color: COLORS.gray
    });

    page.drawText('LUME | thelumeproject.com', {
        x: PAGE_WIDTH - MARGIN - 130,
        y: 20,
        size: 9,
        font: helveticaBold,
        color: COLORS.coral
    });

    // Save
    const pdfBytes = await pdfDoc.save();
    const outputPath = path.join(__dirname, 'networking-checklist.pdf');
    fs.writeFileSync(outputPath, pdfBytes);
    console.log(`PDF created: ${outputPath}`);
    return outputPath;
}

createChecklist().catch(console.error);
