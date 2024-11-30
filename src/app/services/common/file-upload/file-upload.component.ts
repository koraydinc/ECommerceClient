import { Component, Input } from '@angular/core';
import { NgxFileDropEntry } from 'ngx-file-drop';
import { HttpClientService } from '../http-client.service';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { AlertifyService, MessageType, Position } from '../../admin/alertify.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../ui/custom-toastr.service';
import { MatDialog } from '@angular/material/dialog';
import { FileUploadDialogComponent, FileUploadState } from '../../../dialogs/file-upload-dialog/file-upload-dialog.component';
import { DialogService } from '../dialog.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerType } from '../../../base/base.component';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrl: './file-upload.component.scss'
})
export class FileUploadComponent {
  constructor(private httpClientService: HttpClientService,
    private alertifyService: AlertifyService,
    private customToastrService: CustomToastrService,
    private dialog: MatDialog,
    private dialogService: DialogService,
    private spinner: NgxSpinnerService) {
  }

  public files: NgxFileDropEntry[];

  @Input() options: Partial<FileUploadOptions>;

  public dropped(files: NgxFileDropEntry[]) {
    this.files = files;
    const fileDatas: FormData = new FormData();
    for (const droppedFile of files) {
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {
          fileDatas.append(file.name, file, droppedFile.relativePath)
        });
      } else {
        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
        console.log(droppedFile.relativePath, fileEntry);
      }
    }

    this.dialogService.openDialog({
      componentType: FileUploadDialogComponent,
      data: FileUploadState.Yes,
      afterClosed: () => {
        this.spinner.show(SpinnerType.Timer);
        this.httpClientService.post({
          controller: this.options.controller,
          action: this.options.action,
          queryString: this.options.queryString,
          headers: new HttpHeaders({ "responseType": "blob" })
        }, fileDatas).subscribe({
          complete: () => {       
            this.spinner.hide(SpinnerType.Timer);
            let message = "Dosyalar başarıyla yüklenmiştir.";
            switch (this.options.isAdminPage) {
              case true:
                this.alertifyService.message(message, {
                  dismissOthers: true,
                  messageType: MessageType.Success,
                  position: Position.TopRight
                })
                break;
              case false:
                this.customToastrService.message(message, "Başarılı", {
                  messageType: ToastrMessageType.Success,
                  position: ToastrPosition.TopRight
                })
                break;
            }
          },
          error: (errorResponse: HttpErrorResponse) => {
            this.spinner.hide(SpinnerType.Timer);
            let message = "Dosyalar yüklenirken bir hata oluşmuştur.";
            switch (this.options.isAdminPage) {
              case true:
                this.alertifyService.message(message, {
                  dismissOthers: true,
                  messageType: MessageType.Error,
                  position: Position.TopRight
                })
                break;
              case false:
                this.customToastrService.message(message, "Başarısız", {
                  messageType: ToastrMessageType.Error,
                  position: ToastrPosition.TopRight
                })
                break;
            }
            
          }
        })
      }
    });
  }

  // public fileOver(event) {
  //   console.log(event);
  // }

  // public fileLeave(event) {
  //   console.log(event);
  // }
}

export class FileUploadOptions {
  controller?: string;
  action?: string;
  queryString?: string;
  explanation?: string;
  accept?: string;
  isAdminPage: boolean = false;
}
