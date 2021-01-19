import { Component } from '@angular/core';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'angular-bootstrap-template';

  capturedImage!: string;

  print(): void {
    const printArea = document.querySelector('#print-area') as HTMLElement;

    if (printArea)
      html2canvas(printArea, {
        backgroundColor: '#FFFFFF',
        scale: 0.5,
      }).then((canvas) => {
        this.capturedImage = canvas.toDataURL('image/png');
        console.log('canvas.toDataURL() -->' + this.capturedImage);
        const doc = new jsPDF({
          orientation: 'p',
          unit: 'cm',
          format: [6, 4],
        });

        // Adjust image size to page size
        const imgProps = doc.getImageProperties(this.capturedImage);
        const pdfWidth = doc.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

        doc.addImage(this.capturedImage, 'PNG', 0, 0, pdfWidth, pdfHeight);
        doc.save('test.pdf');
      });
  }
}
