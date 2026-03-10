import React, { useState } from "react";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import fontkit from '@pdf-lib/fontkit';

function JobPDF() {
  const [downloadUrl, setDownloadUrl] = useState(null);

  const generateExistingPdf = async () => {
    // 1. โหลดไฟล์ PDF ต้นฉบับ (เช่น จากโฟลเดอร์ public หรือ URL)
    const existingPdfBytes = await fetch("/MediaReportingDocument.pdf").then(
      (res) => res.arrayBuffer(),
    );
    console.log("ddd", existingPdfBytes);

// 2. สร้าง PDF Document และลงทะเบียน fontkit (สำหรับภาษาไทย)
      const pdfDoc = await PDFDocument.load(existingPdfBytes);
      pdfDoc.registerFontkit(fontkit);

      // 3. โหลดฟอนต์ภาษาไทยจาก public
      const fontBytes = await fetch('/font/ThaiFonts/THSarabunNew.ttf').then(res => res.arrayBuffer());
      const thaiFont = await pdfDoc.embedFont(fontBytes);

    // 4. ดึงหน้าแรกของเอกสาร (ส่วนใหญ่เกียรติบัตรมีหน้าเดียว)
    const pages = pdfDoc.getPages();
    const firstPage = pages[0];
    const { width, height } = firstPage.getSize();
    // ถ้าเป็นแนวตั้ง (Portrait)
// const width = 595;
// const height = 842;

// ถ้าเป็นแนวนอน (Landscape) - นิยมใช้ทำเกียรติบัตร
// const width = 842;
// const height = 595;
    // ฟังก์ชันแปลง mm เป็น points
    const mmToPoints = (mm) => mm * 2.8346;

    // การใช้งานใน drawText
    const xCode = mmToPoints(43.5); // 50mm จากขอบซ้าย
    const yCode = 842 - mmToPoints(38); // 38mm จากขอบล่าง

    // 5. วาดตัวอักษรลงไป (ต้องสุ่มหาพิกัด X, Y ที่ถูกต้องบนไฟล์ของคุณ)
    // ข้อมูล: ชื่อคน
    // วาดจุดสีแดงที่พิกัด X: 50, Y: 38 เพื่อดูตำแหน่ง

    firstPage.drawText("สถาพร บุญเกิด", {
      x: xCode, // กึ่งกลางหน้าลบด้วยประมาณครึ่งหนึ่งของความยาวข้อความ
      y: yCode, // ตำแหน่งความสูง
      size: 18,
      font: thaiFont,
      color: rgb(0, 0, 0), // สีดำ
    });

    // 6. เซฟไฟล์ PDF ที่แก้ไขแล้ว
    const pdfBytes = await pdfDoc.save();

    // 7. สร้าง Download URL เพื่อให้ผู้ใช้คลิกโหลด
    const blob = new Blob([pdfBytes], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);
    setDownloadUrl(url);
  };

const handleDownload = async () => {
    try {
      const mmToPt = (mm) => mm * 2.8346;
      // 1. โหลดไฟล์ PDF ต้นฉบับ
      const existingPdfBytes = await fetch('/MediaReportingDocument.pdf').then(res => res.arrayBuffer());
      const pdfDoc = await PDFDocument.load(existingPdfBytes);
      pdfDoc.registerFontkit(fontkit);

      // 2. โหลดฟอนต์ภาษาไทย
      const fontBytes = await fetch('/font/ThaiFonts/THSarabunNew.ttf').then(res => res.arrayBuffer());
      const thaiFont = await pdfDoc.embedFont(fontBytes);

      // 3. ตั้งค่าหน้ากระดาษ (A4: 595 x 842 pts)
      const pages = pdfDoc.getPages();
      const firstPage = pages[0];
      const { width, height } = firstPage.getSize();

      // 4. คำนวณพิกัดจากหน่วย mm (อิงจากขอบ ซ้าย-บน)
      const targetX = mmToPt(43.5); 
      const targetYFromTop = mmToPt(38);
      
      // PDF นับ Y จากล่างขึ้นบน จึงต้องเอาความสูงทั้งหมดลบออก
      const finalY = height - targetYFromTop;

      // 5. เขียนข้อความลงไป
      firstPage.drawText('ข้อความที่ตำแหน่ง 50x38 mm', {
        x: targetX,
        y: finalY,
        size: 20, // ปรับขนาดตามเหมาะสม
        font: thaiFont,
        color: rgb(0, 0, 0),
      });

      // 6. สร้างไฟล์และสั่ง Download
      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = 'certificate_updated.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

    } catch (error) {
      console.error('เกิดข้อผิดพลาด:', error);
      alert('ไม่สามารถสร้างไฟล์ PDF ได้');
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>เพิ่มชื่อลงในเกียรติบัตร PDF</h1>
      <p>
        ต้องมีไฟล์ `MediaReportingDocument.pdf` อยู่ในโฟลเดอร์ `public`
        ของโปรเจกต์
      </p>

      <button onClick={generateExistingPdf}>1. สร้างเกียรติบัตร</button>

      {downloadUrl && (
        <div style={{ marginTop: 20 }}>
          <a href={downloadUrl} download="เอกสารแจ้งงานสื่อฯ.pdf">
            <button style={{ backgroundColor: "#4CAF50", color: "white" }}>
              2. ดาวน์โหลด PDF
            </button>
          </a>
        </div>
      )}

      <button 
        onClick={handleDownload}
        style={{
          padding: '15px 30px',
          fontSize: '18px',
          backgroundColor: '#28a745',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
        }}
      >
        ดาวน์โหลดเกียรติบัตร (PDF)
      </button>
    </div>
  );
}

export default JobPDF;
