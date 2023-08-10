import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { AngularEditorConfig } from '@kolkov/angular-editor';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.scss'],
})
export class EmailComponent implements AfterViewInit {
  // htmlContent = '';
  htmlContent = `<font face="Arial">Testing Text in four fonts arial</font><div><font face="Times New Roman">Testing Text in four fonts TNR</font></div><div><font face="Calibri">Testing Text in four fonts Calibri</font></div><div><font face="Comic Sans MS">Testing Text in four fonts Comic</font></div><div><font face="Comic Sans MS"><br></font></div><div><font face="Comic Sans MS"><br></font></div><div><font face="Arial"><b>Bold</b></font></div><div><font face="Arial"><i>Italics</i></font></div><div><font face="Arial"><b><i>Both</i></b></font></div><div><font face="Arial"><strike>Strike</strike></font></div><div><font face="Arial"><u>Underline</u></font></div><div><font face="Arial"><br></font></div><div><font face="Arial" color="#ec5151">Red Text</font></div><div><font face="Arial"><br></font></div><div><font face="Arial" color="#f05656">Red Text blue Background</font></div><div><font face="Arial"><br></font></div><div><font face="Arial" size="7">7 font</font></div><div><font face="Arial" size="7"><br></font></div><div><ul><li><font face="Arial" size="2">unordered</font></li></ul><font face="Arial" size="2"><ol><li><font face="Arial" size="2">ordered</font></li></ol><br></font></div>`;

  @ViewChild('toWho') to!: ElementRef;
  @ViewChild('subject') subject!: ElementRef;
  @ViewChild('sendEmailButton') sendEmailButton!: ElementRef;
  shouldErrorShow = false;
  showDialog = false;
  url: string = 'https://localhost:7001/email';

  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '300px', // was auto
    minHeight: '0',
    maxHeight: 'auto',
    width: 'auto',
    minWidth: '0',
    translate: 'yes',
    enableToolbar: true,
    showToolbar: true,
    placeholder: 'Enter text here...',
    defaultParagraphSeparator: '',
    defaultFontName: '',
    defaultFontSize: '',
    fonts: [
      { class: 'arial', name: 'Arial' },
      { class: 'times-new-roman', name: 'Times New Roman' },
      { class: 'calibri', name: 'Calibri' },
      { class: 'comic-sans-ms', name: 'Comic Sans MS' },
    ],
    customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText',
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],
    uploadUrl: 'v1/image',
    // upload: (file: File) => { ... }
    uploadWithCredentials: false,
    sanitize: true,
    toolbarPosition: 'bottom',
    toolbarHiddenButtons: [
      [
        'subscript',
        'superscript',
        // 'justifyLeft',
        // 'justifyCenter',
        // 'justifyRight',
        // 'justifyFull',
        // 'indent',
        // 'outdent',
        // 'insertUnorderedList',
        // 'insertOrderedList',
        'heading',
        // 'fontName',
      ],
      [
        // 'fontSize',
        // 'textColor',
        'backgroundColor',
        'customClasses',
        // 'link',
        // 'unlink',
        'insertImage',
        'insertVideo',
        'insertHorizontalRule',
        'removeFormat',
        'toggleEditorMode',
      ],
    ],
  };
  ngAfterViewInit() {}
  constructor(private http: HttpClient) {}

  sendEmail() {
    const email = {
      To: this.to.nativeElement.value,
      Subject: this.subject.nativeElement.value,
      Body: this.htmlContent,
    };
    this.http.put(this.url, email).subscribe({
      next: (data) => {
        console.log(data);
      },
      error: (er) => {
        console.error(er);
        console.error(er.error);
      },
    });

    this.htmlContent = '';
  }
  recipientChanges() {
    const text: string = this.to.nativeElement.value;

    const haveAT: boolean = text.includes('@');
    const haveDotCom: boolean = text.includes('.com');

    if (haveAT && haveDotCom) {
      this.shouldErrorShow = false;
      this.sendEmailButton.nativeElement.disabled = false;
    } else {
      // this.to.nativeElement.className = 'errorText';
      this.shouldErrorShow = true;
      this.sendEmailButton.nativeElement.disabled = true;
    }
  }
}

// <font face="Arial">Testing Text in four fonts arial</font><div><font face="Times New Roman">Testing Text in four fonts TNR</font></div><div><font face="Calibri">Testing Text in four fonts Calibri</font></div><div><font face="Comic Sans MS">Testing Text in four fonts Comic</font></div><div><font face="Comic Sans MS"><br></font></div><div><font face="Comic Sans MS"><br></font></div><div><font face="Arial"><b>Bold</b></font></div><div><font face="Arial"><i>Italics</i></font></div><div><font face="Arial"><b><i>Both</i></b></font></div><div><font face="Arial"><strike>Strike</strike></font></div><div><font face="Arial"><u>Underline</u></font></div><div><font face="Arial"><br></font></div><div><font face="Arial" color="#ec5151">Red Text</font></div><div><font face="Arial"><br></font></div><div><font face="Arial" color="#f05656">Red Text blue Background</font></div><div><font face="Arial"><br></font></div><div><font face="Arial" size="7">7 font</font></div><div><font face="Arial" size="7"><br></font></div><div><ul><li><font face="Arial" size="2">unordered</font></li></ul><font face="Arial" size="2"><ol><li><font face="Arial" size="2">ordered</font></li></ol><br></font></div>
