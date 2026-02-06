import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import fontkit from '@pdf-lib/fontkit';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// LUME Brand Colors
const COLORS = {
    coral: rgb(255/255, 81/255, 73/255),
    coralDark: rgb(232/255, 68/255, 61/255),
    deepRed: rgb(184/255, 0/255, 0/255),
    black: rgb(0, 0, 0),
    charcoal: rgb(26/255, 26/255, 26/255),
    darkGray: rgb(43/255, 50/255, 58/255),
    gray: rgb(107/255, 107/255, 107/255),
    lightGray: rgb(245/255, 245/255, 245/255),
    white: rgb(1, 1, 1),
    cream: rgb(250/255, 250/255, 250/255),
};

// Page dimensions (A4)
const PAGE_WIDTH = 595;
const PAGE_HEIGHT = 842;
const MARGIN = 60;
const CONTENT_WIDTH = PAGE_WIDTH - (MARGIN * 2);

async function createPlaybook() {
    const pdfDoc = await PDFDocument.create();
    pdfDoc.registerFontkit(fontkit);

    // Embed standard fonts (we'll use these as fallback)
    const helvetica = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const helveticaBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
    const helveticaOblique = await pdfDoc.embedFont(StandardFonts.HelveticaOblique);
    const timesRoman = await pdfDoc.embedFont(StandardFonts.TimesRoman);
    const timesItalic = await pdfDoc.embedFont(StandardFonts.TimesRomanItalic);
    const timesBold = await pdfDoc.embedFont(StandardFonts.TimesRomanBold);

    // Font assignments
    const displayFont = timesBold;
    const displayItalic = timesItalic;
    const bodyFont = helvetica;
    const bodyBold = helveticaBold;

    // Helper function to wrap text
    function wrapText(text, font, fontSize, maxWidth) {
        const words = text.split(' ');
        const lines = [];
        let currentLine = '';

        for (const word of words) {
            const testLine = currentLine ? `${currentLine} ${word}` : word;
            const width = font.widthOfTextAtSize(testLine, fontSize);

            if (width > maxWidth && currentLine) {
                lines.push(currentLine);
                currentLine = word;
            } else {
                currentLine = testLine;
            }
        }
        if (currentLine) lines.push(currentLine);
        return lines;
    }

    // Helper to draw wrapped paragraph
    function drawParagraph(page, text, x, y, font, fontSize, maxWidth, lineHeight, color = COLORS.darkGray) {
        const lines = wrapText(text, font, fontSize, maxWidth);
        let currentY = y;
        for (const line of lines) {
            page.drawText(line, { x, y: currentY, size: fontSize, font, color });
            currentY -= lineHeight;
        }
        return currentY;
    }

    // ============== COVER PAGE ==============
    let page = pdfDoc.addPage([PAGE_WIDTH, PAGE_HEIGHT]);

    // Dark background
    page.drawRectangle({
        x: 0, y: 0,
        width: PAGE_WIDTH, height: PAGE_HEIGHT,
        color: COLORS.charcoal
    });

    // Coral accent bar at top
    page.drawRectangle({
        x: 0, y: PAGE_HEIGHT - 8,
        width: PAGE_WIDTH, height: 8,
        color: COLORS.coral
    });

    // LUME text (logo placeholder)
    page.drawText('LUME', {
        x: MARGIN,
        y: PAGE_HEIGHT - 80,
        size: 24,
        font: displayFont,
        color: COLORS.white
    });

    // Main title
    page.drawText('THE HNI', {
        x: MARGIN,
        y: PAGE_HEIGHT - 280,
        size: 48,
        font: displayFont,
        color: COLORS.white
    });
    page.drawText('NETWORKING', {
        x: MARGIN,
        y: PAGE_HEIGHT - 340,
        size: 48,
        font: displayFont,
        color: COLORS.coral
    });
    page.drawText('PLAYBOOK', {
        x: MARGIN,
        y: PAGE_HEIGHT - 400,
        size: 48,
        font: displayFont,
        color: COLORS.white
    });

    // Subtitle
    const subtitle = "How Hyderabad's Most Connected Professionals Build Relationships That Compound";
    const subtitleLines = wrapText(subtitle, displayItalic, 18, CONTENT_WIDTH);
    let subY = PAGE_HEIGHT - 480;
    for (const line of subtitleLines) {
        page.drawText(line, {
            x: MARGIN,
            y: subY,
            size: 18,
            font: displayItalic,
            color: rgb(0.7, 0.7, 0.7)
        });
        subY -= 26;
    }

    // Bottom tagline
    page.drawText('A guide for founders, executives, and professionals', {
        x: MARGIN,
        y: 100,
        size: 12,
        font: bodyFont,
        color: rgb(0.5, 0.5, 0.5)
    });
    page.drawText('who want more than business cards and small talk.', {
        x: MARGIN,
        y: 82,
        size: 12,
        font: bodyFont,
        color: rgb(0.5, 0.5, 0.5)
    });

    // ============== PAGE 2: TABLE OF CONTENTS ==============
    page = pdfDoc.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
    page.drawRectangle({ x: 0, y: 0, width: PAGE_WIDTH, height: PAGE_HEIGHT, color: COLORS.cream });

    // Coral accent
    page.drawRectangle({ x: 0, y: PAGE_HEIGHT - 4, width: PAGE_WIDTH, height: 4, color: COLORS.coral });

    page.drawText('CONTENTS', {
        x: MARGIN,
        y: PAGE_HEIGHT - 100,
        size: 32,
        font: displayFont,
        color: COLORS.charcoal
    });

    const tocItems = [
        { num: '', title: 'Introduction: Why Your Network Isn\'t Working', page: '4' },
        { num: '01', title: 'The Compound Network Effect', page: '6' },
        { num: '02', title: 'The 5 Types of Connections You Need', page: '9' },
        { num: '03', title: 'Quality Over Quantity: The Curated Circle', page: '13' },
        { num: '04', title: 'Where High-Value People Actually Meet', page: '16' },
        { num: '05', title: 'The Art of the Warm Introduction', page: '19' },
        { num: '06', title: 'From Contact to Connection: The 90-Day System', page: '22' },
        { num: '07', title: 'Common Mistakes That Kill Your Reputation', page: '26' },
        { num: '08', title: 'Your Network Audit Worksheet', page: '28' },
        { num: '', title: 'The Shortcut: Why Curated Communities Win', page: '31' },
    ];

    let tocY = PAGE_HEIGHT - 180;
    for (const item of tocItems) {
        if (item.num) {
            page.drawText(item.num, {
                x: MARGIN,
                y: tocY,
                size: 14,
                font: bodyBold,
                color: COLORS.coral
            });
        }
        page.drawText(item.title, {
            x: MARGIN + (item.num ? 40 : 0),
            y: tocY,
            size: 14,
            font: item.num ? bodyFont : bodyBold,
            color: COLORS.charcoal
        });
        page.drawText(item.page, {
            x: PAGE_WIDTH - MARGIN - 20,
            y: tocY,
            size: 14,
            font: bodyFont,
            color: COLORS.gray
        });
        tocY -= 36;
    }

    // ============== PAGE 3-4: INTRODUCTION ==============
    page = pdfDoc.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
    page.drawRectangle({ x: 0, y: 0, width: PAGE_WIDTH, height: PAGE_HEIGHT, color: COLORS.white });

    // Chapter header
    page.drawRectangle({ x: 0, y: PAGE_HEIGHT - 160, width: PAGE_WIDTH, height: 160, color: COLORS.charcoal });
    page.drawRectangle({ x: 0, y: PAGE_HEIGHT - 164, width: PAGE_WIDTH, height: 4, color: COLORS.coral });

    page.drawText('INTRODUCTION', {
        x: MARGIN,
        y: PAGE_HEIGHT - 80,
        size: 12,
        font: bodyBold,
        color: COLORS.coral
    });

    page.drawText('Why Your Network', {
        x: MARGIN,
        y: PAGE_HEIGHT - 115,
        size: 28,
        font: displayFont,
        color: COLORS.white
    });
    page.drawText('Isn\'t Working', {
        x: MARGIN,
        y: PAGE_HEIGHT - 145,
        size: 28,
        font: displayFont,
        color: COLORS.white
    });

    let y = PAGE_HEIGHT - 220;
    const introText1 = "Let's be honest: you've tried networking. You've attended the industry meetups. You've exchanged business cards at conferences. You've connected with hundreds of people on LinkedIn.";
    y = drawParagraph(page, introText1, MARGIN, y, bodyFont, 12, CONTENT_WIDTH, 20, COLORS.darkGray);

    y -= 20;
    const introText2 = "And yet, when you actually need something — a trusted CA, a reliable contractor, an introduction to a potential investor, a candid second opinion on a business decision — you find yourself scrolling through contacts wondering who you can actually call.";
    y = drawParagraph(page, introText2, MARGIN, y, bodyFont, 12, CONTENT_WIDTH, 20, COLORS.darkGray);

    y -= 20;
    const introText3 = "That's because most networking is broken. It's transactional, shallow, and forgettable. You meet someone, exchange pleasantries, promise to \"stay in touch,\" and then... nothing. The relationship dies before it begins.";
    y = drawParagraph(page, introText3, MARGIN, y, bodyFont, 12, CONTENT_WIDTH, 20, COLORS.darkGray);

    // Pull quote box
    y -= 30;
    page.drawRectangle({
        x: MARGIN,
        y: y - 80,
        width: CONTENT_WIDTH,
        height: 80,
        color: COLORS.cream
    });
    page.drawRectangle({
        x: MARGIN,
        y: y - 80,
        width: 4,
        height: 80,
        color: COLORS.coral
    });

    const quoteText = "\"Your network is your net worth\" isn't just a cliche. It's a fundamental truth that separates those who struggle alone from those who compound success through relationships.";
    const quoteLines = wrapText(quoteText, displayItalic, 14, CONTENT_WIDTH - 40);
    let quoteY = y - 25;
    for (const line of quoteLines) {
        page.drawText(line, {
            x: MARGIN + 20,
            y: quoteY,
            size: 14,
            font: displayItalic,
            color: COLORS.charcoal
        });
        quoteY -= 22;
    }

    y -= 120;
    const introText4 = "This playbook is different. It's not about collecting contacts — it's about building relationships that compound over time. It's the system that Hyderabad's most connected professionals use to build networks that actually work.";
    y = drawParagraph(page, introText4, MARGIN, y, bodyFont, 12, CONTENT_WIDTH, 20, COLORS.darkGray);

    // Page number
    page.drawText('4', { x: PAGE_WIDTH / 2, y: 40, size: 10, font: bodyFont, color: COLORS.gray });

    // ============== INTRODUCTION PAGE 2 ==============
    page = pdfDoc.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
    page.drawRectangle({ x: 0, y: 0, width: PAGE_WIDTH, height: PAGE_HEIGHT, color: COLORS.white });
    page.drawRectangle({ x: 0, y: PAGE_HEIGHT - 4, width: PAGE_WIDTH, height: 4, color: COLORS.coral });

    y = PAGE_HEIGHT - 80;
    page.drawText('What You\'ll Learn', {
        x: MARGIN,
        y: y,
        size: 20,
        font: displayFont,
        color: COLORS.charcoal
    });

    y -= 40;
    const learnings = [
        "The Compound Network Effect — why some relationships multiply while others fizzle",
        "The 5 types of connections every successful professional needs in their circle",
        "Why 30 curated relationships beat 300 random connections",
        "Where high-value people actually spend their time (hint: not at \"networking events\")",
        "The art of getting warm introductions without being awkward or transactional",
        "A 90-day system for turning a first meeting into a lasting relationship",
        "The reputation-killing mistakes most professionals make (and how to avoid them)",
        "A practical worksheet to audit and strengthen your current network"
    ];

    for (const item of learnings) {
        page.drawText('•', { x: MARGIN, y: y, size: 12, font: bodyFont, color: COLORS.coral });
        const itemLines = wrapText(item, bodyFont, 12, CONTENT_WIDTH - 20);
        let itemY = y;
        for (const line of itemLines) {
            page.drawText(line, { x: MARGIN + 15, y: itemY, size: 12, font: bodyFont, color: COLORS.darkGray });
            itemY -= 18;
        }
        y = itemY - 8;
    }

    y -= 30;
    const closingText = "By the end of this playbook, you'll have a clear framework for building the kind of network that opens doors, creates opportunities, and compounds over time. Let's begin.";
    y = drawParagraph(page, closingText, MARGIN, y, bodyBold, 12, CONTENT_WIDTH, 20, COLORS.charcoal);

    page.drawText('5', { x: PAGE_WIDTH / 2, y: 40, size: 10, font: bodyFont, color: COLORS.gray });

    // ============== CHAPTER 1: THE COMPOUND NETWORK EFFECT ==============
    page = pdfDoc.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
    page.drawRectangle({ x: 0, y: 0, width: PAGE_WIDTH, height: PAGE_HEIGHT, color: COLORS.white });

    // Chapter number watermark
    page.drawText('01', {
        x: PAGE_WIDTH - 150,
        y: PAGE_HEIGHT - 200,
        size: 120,
        font: displayFont,
        color: rgb(0.95, 0.95, 0.95)
    });

    // Chapter header
    page.drawRectangle({ x: 0, y: PAGE_HEIGHT - 160, width: PAGE_WIDTH, height: 160, color: COLORS.charcoal });
    page.drawRectangle({ x: 0, y: PAGE_HEIGHT - 164, width: PAGE_WIDTH, height: 4, color: COLORS.coral });

    page.drawText('CHAPTER ONE', {
        x: MARGIN,
        y: PAGE_HEIGHT - 80,
        size: 12,
        font: bodyBold,
        color: COLORS.coral
    });

    page.drawText('The Compound', {
        x: MARGIN,
        y: PAGE_HEIGHT - 115,
        size: 28,
        font: displayFont,
        color: COLORS.white
    });
    page.drawText('Network Effect', {
        x: MARGIN,
        y: PAGE_HEIGHT - 145,
        size: 28,
        font: displayFont,
        color: COLORS.white
    });

    y = PAGE_HEIGHT - 220;
    const ch1Text1 = "Think about compound interest. A small amount invested consistently, over time, grows exponentially. The magic isn't in any single deposit — it's in the accumulation.";
    y = drawParagraph(page, ch1Text1, MARGIN, y, bodyFont, 12, CONTENT_WIDTH, 20, COLORS.darkGray);

    y -= 15;
    const ch1Text2 = "Your network works the same way. The most successful professionals don't have better networking skills — they have compounding relationships.";
    y = drawParagraph(page, ch1Text2, MARGIN, y, bodyFont, 12, CONTENT_WIDTH, 20, COLORS.darkGray);

    y -= 25;
    page.drawText('Transactional vs. Compound Relationships', {
        x: MARGIN,
        y: y,
        size: 16,
        font: displayFont,
        color: COLORS.charcoal
    });

    y -= 30;
    const ch1Text3 = "Transactional relationships are one-and-done. You meet, you exchange value (or try to), and then you move on. There's no depth, no trust, no compound effect.";
    y = drawParagraph(page, ch1Text3, MARGIN, y, bodyFont, 12, CONTENT_WIDTH, 20, COLORS.darkGray);

    y -= 15;
    const ch1Text4 = "Compound relationships are different. Each interaction builds on the last. Trust deepens. Understanding grows. The relationship becomes more valuable over time — to both parties.";
    y = drawParagraph(page, ch1Text4, MARGIN, y, bodyFont, 12, CONTENT_WIDTH, 20, COLORS.darkGray);

    y -= 25;
    // Comparison table
    page.drawRectangle({ x: MARGIN, y: y - 140, width: CONTENT_WIDTH, height: 140, color: COLORS.cream });

    page.drawText('TRANSACTIONAL', { x: MARGIN + 20, y: y - 25, size: 10, font: bodyBold, color: COLORS.gray });
    page.drawText('COMPOUND', { x: MARGIN + 250, y: y - 25, size: 10, font: bodyBold, color: COLORS.coral });

    const comparisons = [
        ['What can you do for me?', 'How can we help each other grow?'],
        ['Surface-level exchanges', 'Deep, meaningful conversations'],
        ['Forgotten after the event', 'Remembered and revisited'],
        ['Value extracted once', 'Value multiplies over time'],
    ];

    let compY = y - 50;
    for (const [trans, comp] of comparisons) {
        page.drawText(trans, { x: MARGIN + 20, y: compY, size: 10, font: bodyFont, color: COLORS.gray });
        page.drawText(comp, { x: MARGIN + 250, y: compY, size: 10, font: bodyFont, color: COLORS.charcoal });
        compY -= 25;
    }

    page.drawText('6', { x: PAGE_WIDTH / 2, y: 40, size: 10, font: bodyFont, color: COLORS.gray });

    // ============== CHAPTER 1 CONTINUED ==============
    page = pdfDoc.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
    page.drawRectangle({ x: 0, y: 0, width: PAGE_WIDTH, height: PAGE_HEIGHT, color: COLORS.white });
    page.drawRectangle({ x: 0, y: PAGE_HEIGHT - 4, width: PAGE_WIDTH, height: 4, color: COLORS.coral });

    y = PAGE_HEIGHT - 80;
    page.drawText('The Math of Compound Networks', {
        x: MARGIN,
        y: y,
        size: 20,
        font: displayFont,
        color: COLORS.charcoal
    });

    y -= 40;
    const ch1Text5 = "Here's a simple illustration. Let's say you meet 10 people at a networking event:";
    y = drawParagraph(page, ch1Text5, MARGIN, y, bodyFont, 12, CONTENT_WIDTH, 20, COLORS.darkGray);

    y -= 20;
    const scenario1 = "Transactional approach: You collect 10 business cards. Maybe 2 respond to your follow-up email. One month later, you're back to zero. Net gain: minimal.";
    y = drawParagraph(page, scenario1, MARGIN + 20, y, bodyFont, 12, CONTENT_WIDTH - 40, 20, COLORS.darkGray);

    y -= 20;
    const scenario2 = "Compound approach: You have 3 meaningful conversations. You follow up thoughtfully with each. Over 6 months, those 3 become trusted connections who each introduce you to 2-3 others in their circle. Net gain: exponential.";
    y = drawParagraph(page, scenario2, MARGIN + 20, y, bodyFont, 12, CONTENT_WIDTH - 40, 20, COLORS.darkGray);

    y -= 30;
    // Key insight box
    page.drawRectangle({ x: MARGIN, y: y - 80, width: CONTENT_WIDTH, height: 80, color: COLORS.charcoal });
    page.drawText('KEY INSIGHT', { x: MARGIN + 20, y: y - 25, size: 10, font: bodyBold, color: COLORS.coral });
    const insightText = "The goal isn't to meet more people. It's to build deeper relationships with fewer people who matter. Quality compounds. Quantity dilutes.";
    const insightLines = wrapText(insightText, bodyFont, 12, CONTENT_WIDTH - 40);
    let insightY = y - 45;
    for (const line of insightLines) {
        page.drawText(line, { x: MARGIN + 20, y: insightY, size: 12, font: bodyFont, color: COLORS.white });
        insightY -= 18;
    }

    y -= 120;
    page.drawText('How to Build Compound Relationships', {
        x: MARGIN,
        y: y,
        size: 16,
        font: displayFont,
        color: COLORS.charcoal
    });

    y -= 30;
    const compoundSteps = [
        "Invest time upfront: Don't rush to extract value. Invest in understanding the other person first.",
        "Follow up consistently: A relationship without follow-up is like a savings account without deposits.",
        "Give before you ask: The most powerful networkers lead with generosity. They're connectors, not collectors.",
        "Play the long game: The best opportunities often come years after the initial connection.",
    ];

    for (let i = 0; i < compoundSteps.length; i++) {
        page.drawText(`${i + 1}.`, { x: MARGIN, y: y, size: 12, font: bodyBold, color: COLORS.coral });
        const stepLines = wrapText(compoundSteps[i], bodyFont, 12, CONTENT_WIDTH - 25);
        let stepY = y;
        for (const line of stepLines) {
            page.drawText(line, { x: MARGIN + 20, y: stepY, size: 12, font: bodyFont, color: COLORS.darkGray });
            stepY -= 18;
        }
        y = stepY - 10;
    }

    page.drawText('7', { x: PAGE_WIDTH / 2, y: 40, size: 10, font: bodyFont, color: COLORS.gray });

    // ============== CHAPTER 1 PAGE 3 ==============
    page = pdfDoc.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
    page.drawRectangle({ x: 0, y: 0, width: PAGE_WIDTH, height: PAGE_HEIGHT, color: COLORS.white });
    page.drawRectangle({ x: 0, y: PAGE_HEIGHT - 4, width: PAGE_WIDTH, height: 4, color: COLORS.coral });

    y = PAGE_HEIGHT - 80;
    page.drawText('The Compound Network in Action', {
        x: MARGIN,
        y: y,
        size: 20,
        font: displayFont,
        color: COLORS.charcoal
    });

    y -= 40;
    const storyText = "Consider this real scenario: A founder in Hyderabad needed to hire a senior operations leader. Instead of posting on job boards, he reached out to three trusted connections he'd built over the years. Within a week, he had five warm introductions to qualified candidates — including the person he eventually hired.";
    y = drawParagraph(page, storyText, MARGIN, y, bodyFont, 12, CONTENT_WIDTH, 20, COLORS.darkGray);

    y -= 20;
    const storyText2 = "The total time spent \"networking\" over those years? Maybe 30 hours of coffee meetings, dinners, and thoughtful follow-ups. The value created from that single hire? Immeasurable.";
    y = drawParagraph(page, storyText2, MARGIN, y, bodyFont, 12, CONTENT_WIDTH, 20, COLORS.darkGray);

    y -= 20;
    const storyText3 = "That's the compound network effect. Small, consistent investments in relationships paying massive dividends when you need them.";
    y = drawParagraph(page, storyText3, MARGIN, y, bodyBold, 12, CONTENT_WIDTH, 20, COLORS.charcoal);

    // Chapter summary box
    y -= 40;
    page.drawRectangle({ x: MARGIN, y: y - 150, width: CONTENT_WIDTH, height: 150, color: COLORS.cream });
    page.drawRectangle({ x: MARGIN, y: y - 150, width: 4, height: 150, color: COLORS.coral });

    page.drawText('CHAPTER SUMMARY', { x: MARGIN + 20, y: y - 25, size: 10, font: bodyBold, color: COLORS.coral });

    const summaryPoints = [
        "• Networks compound like investments — small, consistent efforts yield exponential returns",
        "• Transactional relationships extract value once; compound relationships multiply value",
        "• Focus on depth over breadth: fewer, stronger connections beat more, weaker ones",
        "• The best time to build your network is before you need it"
    ];

    let summaryY = y - 50;
    for (const point of summaryPoints) {
        page.drawText(point, { x: MARGIN + 20, y: summaryY, size: 11, font: bodyFont, color: COLORS.darkGray });
        summaryY -= 22;
    }

    page.drawText('8', { x: PAGE_WIDTH / 2, y: 40, size: 10, font: bodyFont, color: COLORS.gray });

    // ============== CHAPTER 2: THE 5 TYPES OF CONNECTIONS ==============
    page = pdfDoc.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
    page.drawRectangle({ x: 0, y: 0, width: PAGE_WIDTH, height: PAGE_HEIGHT, color: COLORS.white });

    // Chapter number watermark
    page.drawText('02', {
        x: PAGE_WIDTH - 150,
        y: PAGE_HEIGHT - 200,
        size: 120,
        font: displayFont,
        color: rgb(0.95, 0.95, 0.95)
    });

    // Chapter header
    page.drawRectangle({ x: 0, y: PAGE_HEIGHT - 160, width: PAGE_WIDTH, height: 160, color: COLORS.charcoal });
    page.drawRectangle({ x: 0, y: PAGE_HEIGHT - 164, width: PAGE_WIDTH, height: 4, color: COLORS.coral });

    page.drawText('CHAPTER TWO', {
        x: MARGIN,
        y: PAGE_HEIGHT - 80,
        size: 12,
        font: bodyBold,
        color: COLORS.coral
    });

    page.drawText('The 5 Types of', {
        x: MARGIN,
        y: PAGE_HEIGHT - 115,
        size: 28,
        font: displayFont,
        color: COLORS.white
    });
    page.drawText('Connections You Need', {
        x: MARGIN,
        y: PAGE_HEIGHT - 145,
        size: 28,
        font: displayFont,
        color: COLORS.white
    });

    y = PAGE_HEIGHT - 220;
    const ch2Intro = "Not all connections are created equal. The most effective networks aren't random collections of contacts — they're strategically assembled portfolios of relationships that serve different purposes.";
    y = drawParagraph(page, ch2Intro, MARGIN, y, bodyFont, 12, CONTENT_WIDTH, 20, COLORS.darkGray);

    y -= 15;
    const ch2Intro2 = "Think of your network like an investment portfolio. You wouldn't put all your money in one stock. Similarly, you need diversification in your relationships.";
    y = drawParagraph(page, ch2Intro2, MARGIN, y, bodyFont, 12, CONTENT_WIDTH, 20, COLORS.darkGray);

    y -= 30;
    page.drawText('The 5 Essential Connection Types', {
        x: MARGIN,
        y: y,
        size: 16,
        font: displayFont,
        color: COLORS.charcoal
    });

    y -= 35;
    // Connection Type 1
    page.drawText('1', { x: MARGIN, y: y + 5, size: 24, font: displayFont, color: COLORS.coral });
    page.drawText('MENTORS', { x: MARGIN + 30, y: y, size: 14, font: bodyBold, color: COLORS.charcoal });
    y -= 20;
    const mentorText = "People 10-20 years ahead of you in their journey. They've navigated the challenges you're facing and can offer hard-won wisdom. A good mentor shortens your learning curve by years.";
    y = drawParagraph(page, mentorText, MARGIN + 30, y, bodyFont, 11, CONTENT_WIDTH - 30, 18, COLORS.darkGray);

    y -= 20;
    // Connection Type 2
    page.drawText('2', { x: MARGIN, y: y + 5, size: 24, font: displayFont, color: COLORS.coral });
    page.drawText('PEERS', { x: MARGIN + 30, y: y, size: 14, font: bodyBold, color: COLORS.charcoal });
    y -= 20;
    const peerText = "People at your level, fighting similar battles. They understand your daily challenges in a way mentors can't. Peers provide camaraderie, fresh perspectives, and mutual support.";
    y = drawParagraph(page, peerText, MARGIN + 30, y, bodyFont, 11, CONTENT_WIDTH - 30, 18, COLORS.darkGray);

    y -= 20;
    // Connection Type 3
    page.drawText('3', { x: MARGIN, y: y + 5, size: 24, font: displayFont, color: COLORS.coral });
    page.drawText('OPERATORS', { x: MARGIN + 30, y: y, size: 14, font: bodyBold, color: COLORS.charcoal });
    y -= 20;
    const operatorText = "The doers. CAs, lawyers, consultants, contractors — people who get things done. When you need execution, not advice, these are your go-to connections.";
    y = drawParagraph(page, operatorText, MARGIN + 30, y, bodyFont, 11, CONTENT_WIDTH - 30, 18, COLORS.darkGray);

    page.drawText('9', { x: PAGE_WIDTH / 2, y: 40, size: 10, font: bodyFont, color: COLORS.gray });

    // ============== CHAPTER 2 CONTINUED ==============
    page = pdfDoc.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
    page.drawRectangle({ x: 0, y: 0, width: PAGE_WIDTH, height: PAGE_HEIGHT, color: COLORS.white });
    page.drawRectangle({ x: 0, y: PAGE_HEIGHT - 4, width: PAGE_WIDTH, height: 4, color: COLORS.coral });

    y = PAGE_HEIGHT - 80;
    // Connection Type 4
    page.drawText('4', { x: MARGIN, y: y + 5, size: 24, font: displayFont, color: COLORS.coral });
    page.drawText('CONNECTORS', { x: MARGIN + 30, y: y, size: 14, font: bodyBold, color: COLORS.charcoal });
    y -= 25;
    const connectorText = "The super-networkers who know everyone. They may not be experts in any particular field, but they know exactly who to call for anything. One connector can unlock dozens of valuable introductions.";
    y = drawParagraph(page, connectorText, MARGIN + 30, y, bodyFont, 11, CONTENT_WIDTH - 30, 18, COLORS.darkGray);

    y -= 25;
    // Connection Type 5
    page.drawText('5', { x: MARGIN, y: y + 5, size: 24, font: displayFont, color: COLORS.coral });
    page.drawText('RISING STARS', { x: MARGIN + 30, y: y, size: 14, font: bodyBold, color: COLORS.charcoal });
    y -= 25;
    const risingText = "People 5-10 years behind you who are clearly going places. Today's rising star is tomorrow's industry leader. Investing in these relationships early creates powerful long-term allies.";
    y = drawParagraph(page, risingText, MARGIN + 30, y, bodyFont, 11, CONTENT_WIDTH - 30, 18, COLORS.darkGray);

    y -= 40;
    page.drawText('Why You Need All Five', {
        x: MARGIN,
        y: y,
        size: 16,
        font: displayFont,
        color: COLORS.charcoal
    });

    y -= 30;
    const whyAllFive = "Most professionals over-index on one type. Founders surround themselves with other founders. Executives cluster with executives. This creates echo chambers and blind spots.";
    y = drawParagraph(page, whyAllFive, MARGIN, y, bodyFont, 12, CONTENT_WIDTH, 20, COLORS.darkGray);

    y -= 15;
    const whyAllFive2 = "A balanced network gives you:";
    y = drawParagraph(page, whyAllFive2, MARGIN, y, bodyFont, 12, CONTENT_WIDTH, 20, COLORS.darkGray);

    y -= 15;
    const balancePoints = [
        "Wisdom from mentors when facing big decisions",
        "Solidarity from peers when times are tough",
        "Execution from operators when you need to get things done",
        "Access from connectors when you need introductions",
        "Fresh energy from rising stars who challenge your assumptions"
    ];

    for (const point of balancePoints) {
        page.drawText('•', { x: MARGIN + 15, y: y, size: 12, font: bodyFont, color: COLORS.coral });
        page.drawText(point, { x: MARGIN + 30, y: y, size: 12, font: bodyFont, color: COLORS.darkGray });
        y -= 22;
    }

    page.drawText('10', { x: PAGE_WIDTH / 2, y: 40, size: 10, font: bodyFont, color: COLORS.gray });

    // ============== CHAPTER 2 PAGE 3 ==============
    page = pdfDoc.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
    page.drawRectangle({ x: 0, y: 0, width: PAGE_WIDTH, height: PAGE_HEIGHT, color: COLORS.white });
    page.drawRectangle({ x: 0, y: PAGE_HEIGHT - 4, width: PAGE_WIDTH, height: 4, color: COLORS.coral });

    y = PAGE_HEIGHT - 80;
    page.drawText('Quick Assessment: Your Connection Portfolio', {
        x: MARGIN,
        y: y,
        size: 16,
        font: displayFont,
        color: COLORS.charcoal
    });

    y -= 30;
    const assessIntro = "Take a moment to mentally count: How many people in each category can you actually call when you need them?";
    y = drawParagraph(page, assessIntro, MARGIN, y, bodyFont, 12, CONTENT_WIDTH, 20, COLORS.darkGray);

    y -= 25;
    // Assessment boxes
    const categories = ['Mentors', 'Peers', 'Operators', 'Connectors', 'Rising Stars'];
    for (const cat of categories) {
        page.drawRectangle({ x: MARGIN, y: y - 35, width: CONTENT_WIDTH, height: 35, color: COLORS.cream });
        page.drawText(cat, { x: MARGIN + 15, y: y - 25, size: 12, font: bodyBold, color: COLORS.charcoal });
        page.drawText('Count: _____', { x: PAGE_WIDTH - MARGIN - 100, y: y - 25, size: 12, font: bodyFont, color: COLORS.gray });
        y -= 45;
    }

    y -= 20;
    const assessClose = "If any category has fewer than 3 people, that's a gap worth addressing. The worksheet at the end of this playbook will help you create a plan.";
    y = drawParagraph(page, assessClose, MARGIN, y, bodyFont, 12, CONTENT_WIDTH, 20, COLORS.darkGray);

    // Key insight box
    y -= 30;
    page.drawRectangle({ x: MARGIN, y: y - 80, width: CONTENT_WIDTH, height: 80, color: COLORS.charcoal });
    page.drawText('KEY INSIGHT', { x: MARGIN + 20, y: y - 25, size: 10, font: bodyBold, color: COLORS.coral });
    const insight2 = "The most valuable network isn't the biggest one — it's the most balanced one. Diversify your connections like you'd diversify your investments.";
    const insight2Lines = wrapText(insight2, bodyFont, 12, CONTENT_WIDTH - 40);
    let insight2Y = y - 45;
    for (const line of insight2Lines) {
        page.drawText(line, { x: MARGIN + 20, y: insight2Y, size: 12, font: bodyFont, color: COLORS.white });
        insight2Y -= 18;
    }

    page.drawText('11', { x: PAGE_WIDTH / 2, y: 40, size: 10, font: bodyFont, color: COLORS.gray });

    // ============== CHAPTER 2 SUMMARY ==============
    page = pdfDoc.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
    page.drawRectangle({ x: 0, y: 0, width: PAGE_WIDTH, height: PAGE_HEIGHT, color: COLORS.white });
    page.drawRectangle({ x: 0, y: PAGE_HEIGHT - 4, width: PAGE_WIDTH, height: 4, color: COLORS.coral });

    y = PAGE_HEIGHT - 80;
    page.drawText('Practical Application', {
        x: MARGIN,
        y: y,
        size: 20,
        font: displayFont,
        color: COLORS.charcoal
    });

    y -= 40;
    const practicalIntro = "Here's how to start building each type of connection:";
    y = drawParagraph(page, practicalIntro, MARGIN, y, bodyFont, 12, CONTENT_WIDTH, 20, COLORS.darkGray);

    y -= 20;
    const practicalTips = [
        { type: 'Mentors', tip: 'Identify 3 people whose career you admire. Reach out with a specific, thoughtful question — not a generic "can I pick your brain?"' },
        { type: 'Peers', tip: 'Join or create a small mastermind group (5-8 people). Meet monthly. Share challenges openly.' },
        { type: 'Operators', tip: 'Ask your best connections for their go-to service providers. Build a trusted roster before you need them urgently.' },
        { type: 'Connectors', tip: 'Look for people who seem to know everyone. Offer value first — connectors remember who helps them.' },
        { type: 'Rising Stars', tip: 'Mentor someone. Speak at colleges or industry events. The ambitious ones will find you.' },
    ];

    for (const item of practicalTips) {
        page.drawText(item.type + ':', { x: MARGIN, y: y, size: 12, font: bodyBold, color: COLORS.coral });
        y -= 18;
        const tipLines = wrapText(item.tip, bodyFont, 11, CONTENT_WIDTH - 15);
        for (const line of tipLines) {
            page.drawText(line, { x: MARGIN + 15, y: y, size: 11, font: bodyFont, color: COLORS.darkGray });
            y -= 16;
        }
        y -= 12;
    }

    // Chapter summary box
    y -= 20;
    page.drawRectangle({ x: MARGIN, y: y - 130, width: CONTENT_WIDTH, height: 130, color: COLORS.cream });
    page.drawRectangle({ x: MARGIN, y: y - 130, width: 4, height: 130, color: COLORS.coral });

    page.drawText('CHAPTER SUMMARY', { x: MARGIN + 20, y: y - 25, size: 10, font: bodyBold, color: COLORS.coral });

    const ch2Summary = [
        "• Your network needs 5 types: Mentors, Peers, Operators, Connectors, Rising Stars",
        "• Each type serves a different purpose — you need all five for a complete portfolio",
        "• Most professionals over-index on peers and under-index on the other four",
        "• Audit your current network and intentionally fill the gaps"
    ];

    let ch2SummaryY = y - 50;
    for (const point of ch2Summary) {
        page.drawText(point, { x: MARGIN + 20, y: ch2SummaryY, size: 11, font: bodyFont, color: COLORS.darkGray });
        ch2SummaryY -= 22;
    }

    page.drawText('12', { x: PAGE_WIDTH / 2, y: 40, size: 10, font: bodyFont, color: COLORS.gray });

    // ============== CHAPTER 3: QUALITY OVER QUANTITY ==============
    page = pdfDoc.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
    page.drawRectangle({ x: 0, y: 0, width: PAGE_WIDTH, height: PAGE_HEIGHT, color: COLORS.white });

    page.drawText('03', {
        x: PAGE_WIDTH - 150,
        y: PAGE_HEIGHT - 200,
        size: 120,
        font: displayFont,
        color: rgb(0.95, 0.95, 0.95)
    });

    page.drawRectangle({ x: 0, y: PAGE_HEIGHT - 160, width: PAGE_WIDTH, height: 160, color: COLORS.charcoal });
    page.drawRectangle({ x: 0, y: PAGE_HEIGHT - 164, width: PAGE_WIDTH, height: 4, color: COLORS.coral });

    page.drawText('CHAPTER THREE', { x: MARGIN, y: PAGE_HEIGHT - 80, size: 12, font: bodyBold, color: COLORS.coral });
    page.drawText('Quality Over Quantity:', { x: MARGIN, y: PAGE_HEIGHT - 115, size: 28, font: displayFont, color: COLORS.white });
    page.drawText('The Curated Circle', { x: MARGIN, y: PAGE_HEIGHT - 145, size: 28, font: displayFont, color: COLORS.white });

    y = PAGE_HEIGHT - 220;
    const ch3Text1 = "Here's a counterintuitive truth: the people with the strongest networks often have the fewest LinkedIn connections.";
    y = drawParagraph(page, ch3Text1, MARGIN, y, bodyFont, 12, CONTENT_WIDTH, 20, COLORS.darkGray);

    y -= 15;
    const ch3Text2 = "Why? Because they understand that networking isn't a numbers game. It's a trust game. And trust doesn't scale infinitely.";
    y = drawParagraph(page, ch3Text2, MARGIN, y, bodyFont, 12, CONTENT_WIDTH, 20, COLORS.darkGray);

    y -= 25;
    page.drawText('The Dunbar Number', { x: MARGIN, y: y, size: 16, font: displayFont, color: COLORS.charcoal });

    y -= 30;
    const dunbarText = "Anthropologist Robin Dunbar famously proposed that humans can only maintain about 150 stable relationships. But here's what most people miss: within that 150, there are layers:";
    y = drawParagraph(page, dunbarText, MARGIN, y, bodyFont, 12, CONTENT_WIDTH, 20, COLORS.darkGray);

    y -= 20;
    const dunbarLayers = [
        "5 intimate connections (your inner circle)",
        "15 close friends (people you'd call in a crisis)",
        "50 good friends (people you'd invite to a party)",
        "150 meaningful contacts (people whose names you know)"
    ];

    for (const layer of dunbarLayers) {
        page.drawText('•', { x: MARGIN + 15, y: y, size: 12, font: bodyFont, color: COLORS.coral });
        page.drawText(layer, { x: MARGIN + 30, y: y, size: 12, font: bodyFont, color: COLORS.darkGray });
        y -= 22;
    }

    y -= 15;
    const dunbarClose = "Most networking advice ignores this biological reality. It tells you to \"expand your network\" without acknowledging that expansion dilutes depth.";
    y = drawParagraph(page, dunbarClose, MARGIN, y, bodyFont, 12, CONTENT_WIDTH, 20, COLORS.darkGray);

    page.drawText('13', { x: PAGE_WIDTH / 2, y: 40, size: 10, font: bodyFont, color: COLORS.gray });

    // ============== CHAPTER 3 CONTINUED ==============
    page = pdfDoc.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
    page.drawRectangle({ x: 0, y: 0, width: PAGE_WIDTH, height: PAGE_HEIGHT, color: COLORS.white });
    page.drawRectangle({ x: 0, y: PAGE_HEIGHT - 4, width: PAGE_WIDTH, height: 4, color: COLORS.coral });

    y = PAGE_HEIGHT - 80;
    page.drawText('The 30-Person Inner Circle', { x: MARGIN, y: y, size: 20, font: displayFont, color: COLORS.charcoal });

    y -= 40;
    const innerCircleText = "If you could only maintain 30 professional relationships for the rest of your life, who would make the cut? This thought experiment reveals something important: most of us spread ourselves too thin.";
    y = drawParagraph(page, innerCircleText, MARGIN, y, bodyFont, 12, CONTENT_WIDTH, 20, COLORS.darkGray);

    y -= 15;
    const innerCircle2 = "The goal isn't to limit yourself to 30 people. It's to recognize that your inner circle — the people you invest the most in — should be intentionally curated.";
    y = drawParagraph(page, innerCircle2, MARGIN, y, bodyFont, 12, CONTENT_WIDTH, 20, COLORS.darkGray);

    y -= 25;
    page.drawText('Criteria for Your Inner Circle', { x: MARGIN, y: y, size: 16, font: displayFont, color: COLORS.charcoal });

    y -= 30;
    const criteria = [
        { title: 'Mutual respect', desc: 'You genuinely admire something about them, and vice versa.' },
        { title: 'Complementary strengths', desc: 'They bring something to the table that you don\'t.' },
        { title: 'Shared values', desc: 'You operate with similar ethics and principles.' },
        { title: 'Reciprocity', desc: 'The relationship flows both ways — giving and receiving.' },
        { title: 'Long-term orientation', desc: 'They\'re playing the infinite game, not the short-term one.' },
    ];

    for (const item of criteria) {
        page.drawText('>', { x: MARGIN, y: y, size: 14, font: bodyFont, color: COLORS.coral });
        page.drawText(item.title + ':', { x: MARGIN + 20, y: y, size: 12, font: bodyBold, color: COLORS.charcoal });
        y -= 18;
        const descLines = wrapText(item.desc, bodyFont, 11, CONTENT_WIDTH - 30);
        for (const line of descLines) {
            page.drawText(line, { x: MARGIN + 20, y: y, size: 11, font: bodyFont, color: COLORS.darkGray });
            y -= 16;
        }
        y -= 8;
    }

    // Pull quote
    y -= 20;
    page.drawRectangle({ x: MARGIN, y: y - 70, width: CONTENT_WIDTH, height: 70, color: COLORS.cream });
    page.drawRectangle({ x: MARGIN, y: y - 70, width: 4, height: 70, color: COLORS.coral });

    const ch3Quote = "\"You are the average of the five people you spend the most time with.\" — Jim Rohn";
    page.drawText(ch3Quote, { x: MARGIN + 20, y: y - 40, size: 14, font: displayItalic, color: COLORS.charcoal });

    page.drawText('14', { x: PAGE_WIDTH / 2, y: 40, size: 10, font: bodyFont, color: COLORS.gray });

    // ============== CHAPTER 3 SUMMARY ==============
    page = pdfDoc.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
    page.drawRectangle({ x: 0, y: 0, width: PAGE_WIDTH, height: PAGE_HEIGHT, color: COLORS.white });
    page.drawRectangle({ x: 0, y: PAGE_HEIGHT - 4, width: PAGE_WIDTH, height: 4, color: COLORS.coral });

    y = PAGE_HEIGHT - 80;
    page.drawText('The Curation Mindset', { x: MARGIN, y: y, size: 20, font: displayFont, color: COLORS.charcoal });

    y -= 40;
    const curationText = "Curating your network isn't about being exclusive or elitist. It's about being intentional. It's recognizing that your time and energy are finite, and investing them wisely.";
    y = drawParagraph(page, curationText, MARGIN, y, bodyFont, 12, CONTENT_WIDTH, 20, COLORS.darkGray);

    y -= 15;
    const curation2 = "This means:";
    y = drawParagraph(page, curation2, MARGIN, y, bodyFont, 12, CONTENT_WIDTH, 20, COLORS.darkGray);

    y -= 15;
    const curationPoints = [
        "Saying no to networking events that don't align with your goals",
        "Letting some relationships naturally fade to make room for more valuable ones",
        "Investing deeply in fewer people rather than superficially in many",
        "Being selective about who you spend your limited time with"
    ];

    for (const point of curationPoints) {
        page.drawText('•', { x: MARGIN + 15, y: y, size: 12, font: bodyFont, color: COLORS.coral });
        const pointLines = wrapText(point, bodyFont, 12, CONTENT_WIDTH - 35);
        let pointY = y;
        for (const line of pointLines) {
            page.drawText(line, { x: MARGIN + 30, y: pointY, size: 12, font: bodyFont, color: COLORS.darkGray });
            pointY -= 18;
        }
        y = pointY - 8;
    }

    // Chapter summary
    y -= 30;
    page.drawRectangle({ x: MARGIN, y: y - 130, width: CONTENT_WIDTH, height: 130, color: COLORS.cream });
    page.drawRectangle({ x: MARGIN, y: y - 130, width: 4, height: 130, color: COLORS.coral });

    page.drawText('CHAPTER SUMMARY', { x: MARGIN + 20, y: y - 25, size: 10, font: bodyBold, color: COLORS.coral });

    const ch3Summary = [
        "• The Dunbar number limits meaningful relationships to ~150, with only 15-30 being truly close",
        "• Quality always beats quantity — 30 curated relationships outperform 300 random ones",
        "• Your inner circle should be intentionally curated using clear criteria",
        "• Curation isn't elitism — it's strategic allocation of your limited time and energy"
    ];

    let ch3SummaryY = y - 50;
    for (const point of ch3Summary) {
        page.drawText(point, { x: MARGIN + 20, y: ch3SummaryY, size: 11, font: bodyFont, color: COLORS.darkGray });
        ch3SummaryY -= 22;
    }

    page.drawText('15', { x: PAGE_WIDTH / 2, y: 40, size: 10, font: bodyFont, color: COLORS.gray });

    // ============== CHAPTER 4: WHERE HIGH-VALUE PEOPLE MEET ==============
    page = pdfDoc.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
    page.drawRectangle({ x: 0, y: 0, width: PAGE_WIDTH, height: PAGE_HEIGHT, color: COLORS.white });

    page.drawText('04', { x: PAGE_WIDTH - 150, y: PAGE_HEIGHT - 200, size: 120, font: displayFont, color: rgb(0.95, 0.95, 0.95) });

    page.drawRectangle({ x: 0, y: PAGE_HEIGHT - 160, width: PAGE_WIDTH, height: 160, color: COLORS.charcoal });
    page.drawRectangle({ x: 0, y: PAGE_HEIGHT - 164, width: PAGE_WIDTH, height: 4, color: COLORS.coral });

    page.drawText('CHAPTER FOUR', { x: MARGIN, y: PAGE_HEIGHT - 80, size: 12, font: bodyBold, color: COLORS.coral });
    page.drawText('Where High-Value', { x: MARGIN, y: PAGE_HEIGHT - 115, size: 28, font: displayFont, color: COLORS.white });
    page.drawText('People Actually Meet', { x: MARGIN, y: PAGE_HEIGHT - 145, size: 28, font: displayFont, color: COLORS.white });

    y = PAGE_HEIGHT - 220;
    const ch4Text1 = "Here's a secret that experienced networkers know: the best connections rarely happen at \"networking events.\"";
    y = drawParagraph(page, ch4Text1, MARGIN, y, bodyFont, 12, CONTENT_WIDTH, 20, COLORS.darkGray);

    y -= 15;
    const ch4Text2 = "Think about it. When everyone in the room is explicitly there to network, the dynamic becomes transactional by default. Everyone's scanning name tags, calculating what they can get from each interaction.";
    y = drawParagraph(page, ch4Text2, MARGIN, y, bodyFont, 12, CONTENT_WIDTH, 20, COLORS.darkGray);

    y -= 15;
    const ch4Text3 = "The most meaningful connections happen in contexts where networking isn't the primary purpose.";
    y = drawParagraph(page, ch4Text3, MARGIN, y, bodyBold, 12, CONTENT_WIDTH, 20, COLORS.charcoal);

    y -= 30;
    page.drawText('High-Value Contexts', { x: MARGIN, y: y, size: 16, font: displayFont, color: COLORS.charcoal });

    y -= 30;
    const contexts = [
        { title: 'Shared experiences', desc: 'Travel, adventure trips, retreats. Bonding happens naturally when you\'re out of your comfort zone together.' },
        { title: 'Learning environments', desc: 'Executive education programs, workshops, masterminds. People are more open when they\'re in learning mode.' },
        { title: 'Giving contexts', desc: 'Charity boards, mentorship programs, industry associations. Generosity reveals character.' },
        { title: 'Interest-based communities', desc: 'Golf clubs, wine societies, book clubs. Shared passions create organic connection points.' },
    ];

    for (const ctx of contexts) {
        page.drawText('>', { x: MARGIN, y: y, size: 14, font: bodyFont, color: COLORS.coral });
        page.drawText(ctx.title + ':', { x: MARGIN + 20, y: y, size: 12, font: bodyBold, color: COLORS.charcoal });
        y -= 18;
        const descLines = wrapText(ctx.desc, bodyFont, 11, CONTENT_WIDTH - 30);
        for (const line of descLines) {
            page.drawText(line, { x: MARGIN + 20, y: y, size: 11, font: bodyFont, color: COLORS.darkGray });
            y -= 16;
        }
        y -= 12;
    }

    page.drawText('16', { x: PAGE_WIDTH / 2, y: 40, size: 10, font: bodyFont, color: COLORS.gray });

    // ============== CHAPTER 4 CONTINUED ==============
    page = pdfDoc.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
    page.drawRectangle({ x: 0, y: 0, width: PAGE_WIDTH, height: PAGE_HEIGHT, color: COLORS.white });
    page.drawRectangle({ x: 0, y: PAGE_HEIGHT - 4, width: PAGE_WIDTH, height: 4, color: COLORS.coral });

    y = PAGE_HEIGHT - 80;
    page.drawText('The Hyderabad Landscape', { x: MARGIN, y: y, size: 20, font: displayFont, color: COLORS.charcoal });

    y -= 40;
    const hydText = "In Hyderabad specifically, high-value professionals tend to gather in certain places:";
    y = drawParagraph(page, hydText, MARGIN, y, bodyFont, 12, CONTENT_WIDTH, 20, COLORS.darkGray);

    y -= 20;
    const hydPlaces = [
        "Private clubs in Jubilee Hills and Banjara Hills",
        "Executive education programs at ISB and other institutions",
        "Invite-only dinners and salon-style gatherings",
        "Industry-specific forums and associations",
        "High-end fitness and wellness communities",
        "Curated communities like LUME"
    ];

    for (const place of hydPlaces) {
        page.drawText('•', { x: MARGIN + 15, y: y, size: 12, font: bodyFont, color: COLORS.coral });
        page.drawText(place, { x: MARGIN + 30, y: y, size: 12, font: bodyFont, color: COLORS.darkGray });
        y -= 24;
    }

    y -= 20;
    const hydClose = "The common thread? These are all contexts where people have opted in, passed some filter, and share something beyond just wanting to \"network.\"";
    y = drawParagraph(page, hydClose, MARGIN, y, bodyFont, 12, CONTENT_WIDTH, 20, COLORS.darkGray);

    // Key insight
    y -= 30;
    page.drawRectangle({ x: MARGIN, y: y - 80, width: CONTENT_WIDTH, height: 80, color: COLORS.charcoal });
    page.drawText('KEY INSIGHT', { x: MARGIN + 20, y: y - 25, size: 10, font: bodyBold, color: COLORS.coral });
    const ch4Insight = "Stop looking for networking events. Start looking for contexts where your ideal connections naturally gather — and where the activity itself filters for quality.";
    const ch4InsightLines = wrapText(ch4Insight, bodyFont, 12, CONTENT_WIDTH - 40);
    let ch4InsightY = y - 45;
    for (const line of ch4InsightLines) {
        page.drawText(line, { x: MARGIN + 20, y: ch4InsightY, size: 12, font: bodyFont, color: COLORS.white });
        ch4InsightY -= 18;
    }

    page.drawText('17', { x: PAGE_WIDTH / 2, y: 40, size: 10, font: bodyFont, color: COLORS.gray });

    // ============== CHAPTER 4 SUMMARY ==============
    page = pdfDoc.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
    page.drawRectangle({ x: 0, y: 0, width: PAGE_WIDTH, height: PAGE_HEIGHT, color: COLORS.white });
    page.drawRectangle({ x: 0, y: PAGE_HEIGHT - 4, width: PAGE_WIDTH, height: 4, color: COLORS.coral });

    y = PAGE_HEIGHT - 80;
    page.drawText('Action Steps', { x: MARGIN, y: y, size: 20, font: displayFont, color: COLORS.charcoal });

    y -= 40;
    const ch4Actions = [
        "Identify 3 high-value contexts where your ideal connections naturally gather",
        "Commit to one new community or group this quarter",
        "Reduce time spent at generic networking events by 50%",
        "Look for invite-only or curated experiences over open events"
    ];

    for (let i = 0; i < ch4Actions.length; i++) {
        page.drawText(`${i + 1}.`, { x: MARGIN, y: y, size: 12, font: bodyBold, color: COLORS.coral });
        const actionLines = wrapText(ch4Actions[i], bodyFont, 12, CONTENT_WIDTH - 25);
        let actionY = y;
        for (const line of actionLines) {
            page.drawText(line, { x: MARGIN + 25, y: actionY, size: 12, font: bodyFont, color: COLORS.darkGray });
            actionY -= 18;
        }
        y = actionY - 15;
    }

    // Chapter summary
    y -= 30;
    page.drawRectangle({ x: MARGIN, y: y - 130, width: CONTENT_WIDTH, height: 130, color: COLORS.cream });
    page.drawRectangle({ x: MARGIN, y: y - 130, width: 4, height: 130, color: COLORS.coral });

    page.drawText('CHAPTER SUMMARY', { x: MARGIN + 20, y: y - 25, size: 10, font: bodyBold, color: COLORS.coral });

    const ch4Summary = [
        "• The best connections rarely happen at \"networking events\"",
        "• High-value people gather in contexts with shared experiences, learning, or interests",
        "• Look for invite-only or curated communities with natural filters",
        "• The activity itself should filter for quality — not just proximity"
    ];

    let ch4SummaryY = y - 50;
    for (const point of ch4Summary) {
        page.drawText(point, { x: MARGIN + 20, y: ch4SummaryY, size: 11, font: bodyFont, color: COLORS.darkGray });
        ch4SummaryY -= 22;
    }

    page.drawText('18', { x: PAGE_WIDTH / 2, y: 40, size: 10, font: bodyFont, color: COLORS.gray });

    // ============== CONTINUE WITH REMAINING CHAPTERS (abbreviated for length) ==============

    // CHAPTER 5: THE ART OF WARM INTRODUCTIONS
    page = pdfDoc.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
    page.drawRectangle({ x: 0, y: 0, width: PAGE_WIDTH, height: PAGE_HEIGHT, color: COLORS.white });
    page.drawText('05', { x: PAGE_WIDTH - 150, y: PAGE_HEIGHT - 200, size: 120, font: displayFont, color: rgb(0.95, 0.95, 0.95) });
    page.drawRectangle({ x: 0, y: PAGE_HEIGHT - 160, width: PAGE_WIDTH, height: 160, color: COLORS.charcoal });
    page.drawRectangle({ x: 0, y: PAGE_HEIGHT - 164, width: PAGE_WIDTH, height: 4, color: COLORS.coral });
    page.drawText('CHAPTER FIVE', { x: MARGIN, y: PAGE_HEIGHT - 80, size: 12, font: bodyBold, color: COLORS.coral });
    page.drawText('The Art of the', { x: MARGIN, y: PAGE_HEIGHT - 115, size: 28, font: displayFont, color: COLORS.white });
    page.drawText('Warm Introduction', { x: MARGIN, y: PAGE_HEIGHT - 145, size: 28, font: displayFont, color: COLORS.white });

    y = PAGE_HEIGHT - 220;
    const ch5Text1 = "Cold outreach has a 1-2% response rate. Warm introductions? Closer to 50-80%. That's not a marginal difference — it's a different game entirely.";
    y = drawParagraph(page, ch5Text1, MARGIN, y, bodyFont, 12, CONTENT_WIDTH, 20, COLORS.darkGray);

    y -= 15;
    const ch5Text2 = "A warm introduction carries trust. When someone vouches for you, they're lending you their reputation. That's why the best networkers focus on earning and facilitating warm intros rather than cold outreach.";
    y = drawParagraph(page, ch5Text2, MARGIN, y, bodyFont, 12, CONTENT_WIDTH, 20, COLORS.darkGray);

    y -= 25;
    page.drawText('The Double Opt-In Introduction', { x: MARGIN, y: y, size: 16, font: displayFont, color: COLORS.charcoal });

    y -= 30;
    const doubleOptIn = "Never connect two people without asking both first. The double opt-in introduction respects everyone's time and ensures genuine interest on both sides.";
    y = drawParagraph(page, doubleOptIn, MARGIN, y, bodyFont, 12, CONTENT_WIDTH, 20, COLORS.darkGray);

    y -= 20;
    page.drawText('Template:', { x: MARGIN, y: y, size: 12, font: bodyBold, color: COLORS.coral });
    y -= 25;

    page.drawRectangle({ x: MARGIN, y: y - 100, width: CONTENT_WIDTH, height: 100, color: COLORS.cream });
    const template = "\"Hey [Name], I know someone who might be valuable for you to meet — [Person] is [brief context]. Would you be open to an intro? No pressure either way.\"";
    const templateLines = wrapText(template, displayItalic, 11, CONTENT_WIDTH - 40);
    let templateY = y - 25;
    for (const line of templateLines) {
        page.drawText(line, { x: MARGIN + 20, y: templateY, size: 11, font: displayItalic, color: COLORS.charcoal });
        templateY -= 18;
    }

    page.drawText('19', { x: PAGE_WIDTH / 2, y: 40, size: 10, font: bodyFont, color: COLORS.gray });

    // Chapter 5 continued
    page = pdfDoc.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
    page.drawRectangle({ x: 0, y: 0, width: PAGE_WIDTH, height: PAGE_HEIGHT, color: COLORS.white });
    page.drawRectangle({ x: 0, y: PAGE_HEIGHT - 4, width: PAGE_WIDTH, height: 4, color: COLORS.coral });

    y = PAGE_HEIGHT - 80;
    page.drawText('How to Ask for an Introduction', { x: MARGIN, y: y, size: 20, font: displayFont, color: COLORS.charcoal });

    y -= 40;
    const askIntro = "When asking for an intro, make it easy for the connector. Give them everything they need:";
    y = drawParagraph(page, askIntro, MARGIN, y, bodyFont, 12, CONTENT_WIDTH, 20, COLORS.darkGray);

    y -= 20;
    const askSteps = [
        { title: 'Be specific', desc: 'Don\'t ask for \"anyone in real estate.\" Ask for \"someone who has experience with commercial property development in Hyderabad.\"' },
        { title: 'Explain why', desc: 'Why do you want this connection? What value can you offer them in return?' },
        { title: 'Make it forwardable', desc: 'Write a brief paragraph about yourself that your connector can forward directly.' },
        { title: 'Remove friction', desc: 'Offer to draft the intro email. Make it as easy as possible for them to say yes.' },
    ];

    for (const step of askSteps) {
        page.drawText('>', { x: MARGIN, y: y, size: 14, font: bodyFont, color: COLORS.coral });
        page.drawText(step.title + ':', { x: MARGIN + 20, y: y, size: 12, font: bodyBold, color: COLORS.charcoal });
        y -= 18;
        const descLines = wrapText(step.desc, bodyFont, 11, CONTENT_WIDTH - 30);
        for (const line of descLines) {
            page.drawText(line, { x: MARGIN + 20, y: y, size: 11, font: bodyFont, color: COLORS.darkGray });
            y -= 16;
        }
        y -= 12;
    }

    // Chapter summary
    y -= 20;
    page.drawRectangle({ x: MARGIN, y: y - 110, width: CONTENT_WIDTH, height: 110, color: COLORS.cream });
    page.drawRectangle({ x: MARGIN, y: y - 110, width: 4, height: 110, color: COLORS.coral });

    page.drawText('CHAPTER SUMMARY', { x: MARGIN + 20, y: y - 25, size: 10, font: bodyBold, color: COLORS.coral });

    const ch5Summary = [
        "• Warm intros have 50-80% response rates vs. 1-2% for cold outreach",
        "• Always use double opt-in — ask both parties before connecting them",
        "• When asking for intros: be specific, explain why, make it forwardable",
        "• The best networkers are connectors themselves — give intros generously"
    ];

    let ch5SummaryY = y - 50;
    for (const point of ch5Summary) {
        page.drawText(point, { x: MARGIN + 20, y: ch5SummaryY, size: 11, font: bodyFont, color: COLORS.darkGray });
        ch5SummaryY -= 20;
    }

    page.drawText('20', { x: PAGE_WIDTH / 2, y: 40, size: 10, font: bodyFont, color: COLORS.gray });

    // ============== CHAPTER 6: THE 90-DAY SYSTEM ==============
    page = pdfDoc.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
    page.drawRectangle({ x: 0, y: 0, width: PAGE_WIDTH, height: PAGE_HEIGHT, color: COLORS.white });
    page.drawText('06', { x: PAGE_WIDTH - 150, y: PAGE_HEIGHT - 200, size: 120, font: displayFont, color: rgb(0.95, 0.95, 0.95) });
    page.drawRectangle({ x: 0, y: PAGE_HEIGHT - 160, width: PAGE_WIDTH, height: 160, color: COLORS.charcoal });
    page.drawRectangle({ x: 0, y: PAGE_HEIGHT - 164, width: PAGE_WIDTH, height: 4, color: COLORS.coral });
    page.drawText('CHAPTER SIX', { x: MARGIN, y: PAGE_HEIGHT - 80, size: 12, font: bodyBold, color: COLORS.coral });
    page.drawText('From Contact to Connection:', { x: MARGIN, y: PAGE_HEIGHT - 115, size: 28, font: displayFont, color: COLORS.white });
    page.drawText('The 90-Day System', { x: MARGIN, y: PAGE_HEIGHT - 145, size: 28, font: displayFont, color: COLORS.white });

    y = PAGE_HEIGHT - 220;
    const ch6Text1 = "You met someone interesting. You exchanged contact info. Now what? This is where most networking efforts die — in the gap between first meeting and real relationship.";
    y = drawParagraph(page, ch6Text1, MARGIN, y, bodyFont, 12, CONTENT_WIDTH, 20, COLORS.darkGray);

    y -= 15;
    const ch6Text2 = "The 90-Day System gives you a framework for turning a first meeting into a lasting connection. It's simple, systematic, and it works.";
    y = drawParagraph(page, ch6Text2, MARGIN, y, bodyFont, 12, CONTENT_WIDTH, 20, COLORS.darkGray);

    y -= 25;
    page.drawText('The Timeline', { x: MARGIN, y: y, size: 16, font: displayFont, color: COLORS.charcoal });

    y -= 30;
    const timeline = [
        { time: 'Day 1-2', action: 'Send a personalized follow-up. Reference something specific from your conversation. Add value if possible (an article, an intro, a resource).' },
        { time: 'Week 2', action: 'Share something relevant — an article, a podcast, or news that connects to what you discussed.' },
        { time: 'Week 4', action: 'Suggest a coffee or call to continue the conversation. Be specific about what you\'d like to discuss.' },
        { time: 'Week 8', action: 'Introduce them to someone in your network who might be valuable. Give before asking.' },
        { time: 'Week 12', action: 'By now, you should have had 2-3 meaningful interactions. The foundation is set.' },
    ];

    for (const item of timeline) {
        page.drawText(item.time + ':', { x: MARGIN, y: y, size: 11, font: bodyBold, color: COLORS.coral });
        y -= 16;
        const actionLines = wrapText(item.action, bodyFont, 10, CONTENT_WIDTH - 15);
        for (const line of actionLines) {
            page.drawText(line, { x: MARGIN + 10, y: y, size: 10, font: bodyFont, color: COLORS.darkGray });
            y -= 14;
        }
        y -= 10;
    }

    page.drawText('21', { x: PAGE_WIDTH / 2, y: 40, size: 10, font: bodyFont, color: COLORS.gray });

    // Chapter 6 continued
    page = pdfDoc.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
    page.drawRectangle({ x: 0, y: 0, width: PAGE_WIDTH, height: PAGE_HEIGHT, color: COLORS.white });
    page.drawRectangle({ x: 0, y: PAGE_HEIGHT - 4, width: PAGE_WIDTH, height: 4, color: COLORS.coral });

    y = PAGE_HEIGHT - 80;
    page.drawText('The Key Principles', { x: MARGIN, y: y, size: 20, font: displayFont, color: COLORS.charcoal });

    y -= 40;
    const principles = [
        { title: 'Be consistent, not intense', desc: 'Multiple light touches beat one heavy push. Don\'t overwhelm — stay present.' },
        { title: 'Add value every time', desc: 'Every interaction should give something. Don\'t just \"check in\" — bring something useful.' },
        { title: 'Be patient', desc: 'Relationships take time. Don\'t rush to ask for favors. Build trust first.' },
        { title: 'Keep notes', desc: 'Track what you discussed, their interests, their challenges. Personalization is powerful.' },
    ];

    for (const p of principles) {
        page.drawText('>', { x: MARGIN, y: y, size: 14, font: bodyFont, color: COLORS.coral });
        page.drawText(p.title + ':', { x: MARGIN + 20, y: y, size: 12, font: bodyBold, color: COLORS.charcoal });
        y -= 20;
        const pLines = wrapText(p.desc, bodyFont, 11, CONTENT_WIDTH - 30);
        for (const line of pLines) {
            page.drawText(line, { x: MARGIN + 20, y: y, size: 11, font: bodyFont, color: COLORS.darkGray });
            y -= 16;
        }
        y -= 15;
    }

    // Chapter summary
    y -= 20;
    page.drawRectangle({ x: MARGIN, y: y - 110, width: CONTENT_WIDTH, height: 110, color: COLORS.cream });
    page.drawRectangle({ x: MARGIN, y: y - 110, width: 4, height: 110, color: COLORS.coral });

    page.drawText('CHAPTER SUMMARY', { x: MARGIN + 20, y: y - 25, size: 10, font: bodyBold, color: COLORS.coral });

    const ch6Summary = [
        "• The 90-day system: Day 1 follow-up > Week 2 value > Week 4 meeting > Week 8 intro",
        "• Consistency beats intensity — multiple light touches over time",
        "• Always add value — never just \"check in\" without bringing something useful",
        "• Keep notes on every contact to enable meaningful personalization"
    ];

    let ch6SummaryY = y - 50;
    for (const point of ch6Summary) {
        page.drawText(point, { x: MARGIN + 20, y: ch6SummaryY, size: 11, font: bodyFont, color: COLORS.darkGray });
        ch6SummaryY -= 20;
    }

    page.drawText('22', { x: PAGE_WIDTH / 2, y: 40, size: 10, font: bodyFont, color: COLORS.gray });

    // ============== CHAPTER 7: COMMON MISTAKES ==============
    page = pdfDoc.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
    page.drawRectangle({ x: 0, y: 0, width: PAGE_WIDTH, height: PAGE_HEIGHT, color: COLORS.white });
    page.drawText('07', { x: PAGE_WIDTH - 150, y: PAGE_HEIGHT - 200, size: 120, font: displayFont, color: rgb(0.95, 0.95, 0.95) });
    page.drawRectangle({ x: 0, y: PAGE_HEIGHT - 160, width: PAGE_WIDTH, height: 160, color: COLORS.charcoal });
    page.drawRectangle({ x: 0, y: PAGE_HEIGHT - 164, width: PAGE_WIDTH, height: 4, color: COLORS.coral });
    page.drawText('CHAPTER SEVEN', { x: MARGIN, y: PAGE_HEIGHT - 80, size: 12, font: bodyBold, color: COLORS.coral });
    page.drawText('Common Mistakes That', { x: MARGIN, y: PAGE_HEIGHT - 115, size: 28, font: displayFont, color: COLORS.white });
    page.drawText('Kill Your Reputation', { x: MARGIN, y: PAGE_HEIGHT - 145, size: 28, font: displayFont, color: COLORS.white });

    y = PAGE_HEIGHT - 220;
    const ch7Intro = "Your reputation is your most valuable networking asset. It takes years to build and minutes to destroy. Here are the mistakes that silently kill your reputation in professional circles:";
    y = drawParagraph(page, ch7Intro, MARGIN, y, bodyFont, 12, CONTENT_WIDTH, 20, COLORS.darkGray);

    y -= 25;
    const mistakes = [
        { title: 'The Premature Pitch', desc: 'Asking for business or favors before building any relationship. You\'ve just met — slow down.' },
        { title: 'The Name Dropper', desc: 'Constantly mentioning who you know to inflate your importance. It\'s transparent and off-putting.' },
        { title: 'The Ghost', desc: 'Not following up, not responding to messages, disappearing after getting what you wanted.' },
        { title: 'The Taker', desc: 'Always asking, never giving. People notice when the relationship only flows one way.' },
        { title: 'The Oversharer', desc: 'Sharing confidential information to seem \"in the know.\" If you\'ll share their secrets, you\'ll share mine.' },
    ];

    for (const m of mistakes) {
        page.drawText('X', { x: MARGIN, y: y, size: 14, font: bodyFont, color: COLORS.coral });
        page.drawText(m.title + ':', { x: MARGIN + 20, y: y, size: 12, font: bodyBold, color: COLORS.charcoal });
        y -= 18;
        const mLines = wrapText(m.desc, bodyFont, 11, CONTENT_WIDTH - 30);
        for (const line of mLines) {
            page.drawText(line, { x: MARGIN + 20, y: y, size: 11, font: bodyFont, color: COLORS.darkGray });
            y -= 16;
        }
        y -= 15;
    }

    page.drawText('23', { x: PAGE_WIDTH / 2, y: 40, size: 10, font: bodyFont, color: COLORS.gray });

    // Chapter 7 continued
    page = pdfDoc.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
    page.drawRectangle({ x: 0, y: 0, width: PAGE_WIDTH, height: PAGE_HEIGHT, color: COLORS.white });
    page.drawRectangle({ x: 0, y: PAGE_HEIGHT - 4, width: PAGE_WIDTH, height: 4, color: COLORS.coral });

    y = PAGE_HEIGHT - 80;
    const moreMistakes = [
        { title: 'The Poor Introducer', desc: 'Making sloppy introductions without context, without asking permission, or to people who aren\'t a fit.' },
        { title: 'The Follow-Up Failure', desc: 'Promising to send something and never doing it. Small broken promises add up.' },
    ];

    for (const m of moreMistakes) {
        page.drawText('X', { x: MARGIN, y: y, size: 14, font: bodyFont, color: COLORS.coral });
        page.drawText(m.title + ':', { x: MARGIN + 20, y: y, size: 12, font: bodyBold, color: COLORS.charcoal });
        y -= 18;
        const mLines = wrapText(m.desc, bodyFont, 11, CONTENT_WIDTH - 30);
        for (const line of mLines) {
            page.drawText(line, { x: MARGIN + 20, y: y, size: 11, font: bodyFont, color: COLORS.darkGray });
            y -= 16;
        }
        y -= 15;
    }

    y -= 10;
    page.drawText('The Antidotes', { x: MARGIN, y: y, size: 16, font: displayFont, color: COLORS.charcoal });

    y -= 30;
    const antidotes = [
        "Lead with generosity — give before you ask",
        "Keep your promises — small and large",
        "Respect confidentiality — always",
        "Follow up consistently — don't disappear",
        "Make quality introductions — or none at all"
    ];

    for (const a of antidotes) {
        page.drawText('>', { x: MARGIN + 15, y: y, size: 12, font: bodyFont, color: COLORS.coral });
        page.drawText(a, { x: MARGIN + 35, y: y, size: 12, font: bodyFont, color: COLORS.darkGray });
        y -= 24;
    }

    // Chapter summary
    y -= 20;
    page.drawRectangle({ x: MARGIN, y: y - 90, width: CONTENT_WIDTH, height: 90, color: COLORS.cream });
    page.drawRectangle({ x: MARGIN, y: y - 90, width: 4, height: 90, color: COLORS.coral });

    page.drawText('CHAPTER SUMMARY', { x: MARGIN + 20, y: y - 25, size: 10, font: bodyBold, color: COLORS.coral });

    const ch7Summary = [
        "• Your reputation is your most valuable networking asset — protect it",
        "• Avoid: premature pitching, name dropping, ghosting, taking without giving",
        "• Lead with generosity, keep promises, respect confidentiality"
    ];

    let ch7SummaryY = y - 45;
    for (const point of ch7Summary) {
        page.drawText(point, { x: MARGIN + 20, y: ch7SummaryY, size: 11, font: bodyFont, color: COLORS.darkGray });
        ch7SummaryY -= 18;
    }

    page.drawText('24', { x: PAGE_WIDTH / 2, y: 40, size: 10, font: bodyFont, color: COLORS.gray });

    // ============== CHAPTER 8: NETWORK AUDIT WORKSHEET ==============
    page = pdfDoc.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
    page.drawRectangle({ x: 0, y: 0, width: PAGE_WIDTH, height: PAGE_HEIGHT, color: COLORS.white });
    page.drawText('08', { x: PAGE_WIDTH - 150, y: PAGE_HEIGHT - 200, size: 120, font: displayFont, color: rgb(0.95, 0.95, 0.95) });
    page.drawRectangle({ x: 0, y: PAGE_HEIGHT - 160, width: PAGE_WIDTH, height: 160, color: COLORS.charcoal });
    page.drawRectangle({ x: 0, y: PAGE_HEIGHT - 164, width: PAGE_WIDTH, height: 4, color: COLORS.coral });
    page.drawText('CHAPTER EIGHT', { x: MARGIN, y: PAGE_HEIGHT - 80, size: 12, font: bodyBold, color: COLORS.coral });
    page.drawText('Your Network Audit', { x: MARGIN, y: PAGE_HEIGHT - 115, size: 28, font: displayFont, color: COLORS.white });
    page.drawText('Worksheet', { x: MARGIN, y: PAGE_HEIGHT - 145, size: 28, font: displayFont, color: COLORS.white });

    y = PAGE_HEIGHT - 220;
    const ch8Intro = "Use this worksheet to assess your current network and create an action plan. Be honest — the gaps you identify are opportunities.";
    y = drawParagraph(page, ch8Intro, MARGIN, y, bodyFont, 12, CONTENT_WIDTH, 20, COLORS.darkGray);

    y -= 25;
    page.drawText('Part 1: Connection Portfolio Audit', { x: MARGIN, y: y, size: 14, font: bodyBold, color: COLORS.charcoal });

    y -= 25;
    const auditCategories = ['Mentors', 'Peers', 'Operators', 'Connectors', 'Rising Stars'];
    for (const cat of auditCategories) {
        page.drawRectangle({ x: MARGIN, y: y - 60, width: CONTENT_WIDTH, height: 60, color: COLORS.cream });
        page.drawText(cat, { x: MARGIN + 15, y: y - 20, size: 12, font: bodyBold, color: COLORS.charcoal });
        page.drawText('Names: ________________________________', { x: MARGIN + 15, y: y - 40, size: 10, font: bodyFont, color: COLORS.gray });
        page.drawText('Gap score (1-10): ___', { x: PAGE_WIDTH - MARGIN - 120, y: y - 20, size: 10, font: bodyFont, color: COLORS.gray });
        y -= 70;
    }

    page.drawText('25', { x: PAGE_WIDTH / 2, y: 40, size: 10, font: bodyFont, color: COLORS.gray });

    // Worksheet continued
    page = pdfDoc.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
    page.drawRectangle({ x: 0, y: 0, width: PAGE_WIDTH, height: PAGE_HEIGHT, color: COLORS.white });
    page.drawRectangle({ x: 0, y: PAGE_HEIGHT - 4, width: PAGE_WIDTH, height: 4, color: COLORS.coral });

    y = PAGE_HEIGHT - 80;
    page.drawText('Part 2: Relationship Depth Assessment', { x: MARGIN, y: y, size: 14, font: bodyBold, color: COLORS.charcoal });

    y -= 30;
    const depthQ = "List your 10 most important professional relationships. Rate the depth of each (1-10):";
    y = drawParagraph(page, depthQ, MARGIN, y, bodyFont, 11, CONTENT_WIDTH, 18, COLORS.darkGray);

    y -= 20;
    for (let i = 1; i <= 10; i++) {
        page.drawText(`${i}.`, { x: MARGIN, y: y, size: 11, font: bodyFont, color: COLORS.coral });
        page.drawText('Name: _________________ Depth: ___ Last contact: _______', { x: MARGIN + 25, y: y, size: 10, font: bodyFont, color: COLORS.gray });
        y -= 22;
    }

    y -= 25;
    page.drawText('Part 3: Action Plan', { x: MARGIN, y: y, size: 14, font: bodyBold, color: COLORS.charcoal });

    y -= 25;
    const actionQs = [
        'Which connection type is your biggest gap?',
        'Name 3 people you want to deepen relationships with:',
        'What communities will you join this quarter?',
        'Who will you reach out to this week?',
    ];

    for (const q of actionQs) {
        page.drawText(q, { x: MARGIN, y: y, size: 11, font: bodyFont, color: COLORS.charcoal });
        y -= 18;
        page.drawText('_____________________________________________', { x: MARGIN, y: y, size: 11, font: bodyFont, color: COLORS.gray });
        y -= 30;
    }

    page.drawText('26', { x: PAGE_WIDTH / 2, y: 40, size: 10, font: bodyFont, color: COLORS.gray });

    // ============== OUTRO: THE SHORTCUT ==============
    page = pdfDoc.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
    page.drawRectangle({ x: 0, y: 0, width: PAGE_WIDTH, height: PAGE_HEIGHT, color: COLORS.charcoal });
    page.drawRectangle({ x: 0, y: PAGE_HEIGHT - 4, width: PAGE_WIDTH, height: 4, color: COLORS.coral });

    y = PAGE_HEIGHT - 100;
    page.drawText('THE SHORTCUT', { x: MARGIN, y: y, size: 12, font: bodyBold, color: COLORS.coral });

    y -= 50;
    page.drawText('Why Curated Communities Win', { x: MARGIN, y: y, size: 32, font: displayFont, color: COLORS.white });

    y -= 50;
    const outroText1 = "Everything in this playbook works. If you apply these principles consistently for 2-3 years, you'll build a network that transforms your career and business.";
    const outroLines1 = wrapText(outroText1, bodyFont, 14, CONTENT_WIDTH);
    for (const line of outroLines1) {
        page.drawText(line, { x: MARGIN, y: y, size: 14, font: bodyFont, color: rgb(0.8, 0.8, 0.8) });
        y -= 24;
    }

    y -= 15;
    const outroText2 = "But there's a shortcut: join a community where the curation has already been done.";
    const outroLines2 = wrapText(outroText2, bodyBold, 14, CONTENT_WIDTH);
    for (const line of outroLines2) {
        page.drawText(line, { x: MARGIN, y: y, size: 14, font: bodyBold, color: COLORS.white });
        y -= 24;
    }

    y -= 20;
    const outroText3 = "The right curated community gives you:";
    page.drawText(outroText3, { x: MARGIN, y: y, size: 13, font: bodyFont, color: rgb(0.8, 0.8, 0.8) });

    y -= 30;
    const benefits = [
        "Pre-vetted connections (the hard work is done)",
        "Built-in contexts for meaningful interaction",
        "Accountability to actually show up",
        "A reputation boost by association",
        "Accelerated relationship building"
    ];

    for (const b of benefits) {
        page.drawText('•', { x: MARGIN + 15, y: y, size: 12, font: bodyFont, color: COLORS.coral });
        page.drawText(b, { x: MARGIN + 35, y: y, size: 13, font: bodyFont, color: COLORS.white });
        y -= 26;
    }

    page.drawText('27', { x: PAGE_WIDTH / 2, y: 40, size: 10, font: bodyFont, color: COLORS.gray });

    // Final CTA page
    page = pdfDoc.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
    page.drawRectangle({ x: 0, y: 0, width: PAGE_WIDTH, height: PAGE_HEIGHT, color: COLORS.charcoal });
    page.drawRectangle({ x: 0, y: PAGE_HEIGHT - 4, width: PAGE_WIDTH, height: 4, color: COLORS.coral });

    y = PAGE_HEIGHT - 150;
    page.drawText('LUME is that community.', { x: MARGIN, y: y, size: 28, font: displayFont, color: COLORS.coral });

    y -= 50;
    const lumeDesc = "We've built what this playbook describes: a curated community of founders, executives, and professionals in Hyderabad who are serious about relationships that compound.";
    const lumeLines = wrapText(lumeDesc, bodyFont, 14, CONTENT_WIDTH);
    for (const line of lumeLines) {
        page.drawText(line, { x: MARGIN, y: y, size: 14, font: bodyFont, color: rgb(0.8, 0.8, 0.8) });
        y -= 24;
    }

    y -= 30;
    const whatYouGet = [
        "2 curated gatherings every month",
        "Concierge access for your business needs",
        "Direct consulting with our founder",
        "A vetted network of high-value professionals"
    ];

    for (const item of whatYouGet) {
        page.drawText('>', { x: MARGIN + 15, y: y, size: 14, font: bodyFont, color: COLORS.coral });
        page.drawText(item, { x: MARGIN + 40, y: y, size: 14, font: bodyFont, color: COLORS.white });
        y -= 28;
    }

    y -= 40;
    // CTA box
    page.drawRectangle({ x: MARGIN, y: y - 100, width: CONTENT_WIDTH, height: 100, color: COLORS.coral });
    page.drawText('Ready to skip the trial-and-error?', { x: MARGIN + 30, y: y - 35, size: 18, font: displayFont, color: COLORS.white });
    page.drawText('Apply for LUME membership today.', { x: MARGIN + 30, y: y - 60, size: 14, font: bodyFont, color: COLORS.white });
    page.drawText('thelumeproject.com/apply', { x: MARGIN + 30, y: y - 85, size: 12, font: bodyBold, color: COLORS.white });

    page.drawText('28', { x: PAGE_WIDTH / 2, y: 40, size: 10, font: bodyFont, color: COLORS.gray });

    // ============== BACK COVER ==============
    page = pdfDoc.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
    page.drawRectangle({ x: 0, y: 0, width: PAGE_WIDTH, height: PAGE_HEIGHT, color: COLORS.black });

    page.drawText('LUME', { x: PAGE_WIDTH / 2 - 50, y: PAGE_HEIGHT / 2 + 50, size: 36, font: displayFont, color: COLORS.white });
    page.drawText('Your network, amplified.', { x: PAGE_WIDTH / 2 - 85, y: PAGE_HEIGHT / 2, size: 14, font: displayItalic, color: COLORS.gray });

    page.drawText('thelumeproject.com', { x: PAGE_WIDTH / 2 - 55, y: 80, size: 11, font: bodyFont, color: COLORS.gray });

    // Save PDF
    const pdfBytes = await pdfDoc.save();

    // Ensure directory exists
    const outputDir = path.join(__dirname);
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }

    const outputPath = path.join(outputDir, 'hni-networking-playbook.pdf');
    fs.writeFileSync(outputPath, pdfBytes);
    console.log(`PDF created: ${outputPath}`);
    return outputPath;
}

createPlaybook().catch(console.error);
