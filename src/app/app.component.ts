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
      html2canvas(printArea).then((canvas) => {
        this.capturedImage = canvas.toDataURL('image/png');
        console.log('canvas.toDataURL() -->' + this.capturedImage);
        const doc = new jsPDF();
        doc.addImage(
          this.capturedImage,
          'PNG',
          0,
          0,
          canvas.width,
          canvas.height
        );
        doc.save('test.pdf');
      });
  }
}
