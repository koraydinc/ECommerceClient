import { Directive, ElementRef, EventEmitter, HostListener, Input, Output, Renderer2 } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerType } from '../../base/base.component';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent, DeleteState } from '../../dialogs/delete-dialog/delete-dialog.component';
import { HttpClientService } from '../../services/common/http-client.service';
import { AlertifyService, MessageType, Position } from '../../services/admin/alertify.service';
import { HttpErrorResponse } from '@angular/common/http';
import { DialogService } from '../../services/common/dialog.service';

declare var $: any;

@Directive({
  selector: '[appDelete]'
})
export class DeleteDirective {

  constructor(private element: ElementRef,
    private _renderer: Renderer2,
    private httpClientService: HttpClientService,
    private spinner: NgxSpinnerService,
    public dialog: MatDialog,
    private alertifyService: AlertifyService,
    private dialogService: DialogService) {
    const img = _renderer.createElement("img");
    img.setAttribute("src", "../../../../../assets/delete.png");
    img.setAttribute("style", "cursor: pointer;");
    this._renderer.appendChild(element.nativeElement, img);
  }

  @Input() id: string;
  @Input() controller: string;
  @Output() callBack: EventEmitter<any> = new EventEmitter();

  @HostListener("click")
  async onClick() {
    this.dialogService.openDialog({
      componentType: DeleteDialogComponent,
      data: DeleteState.Yes,
      afterClosed: async () => {
        this.spinner.show(SpinnerType.BallFussion);
        const td: HTMLTableCellElement = this.element.nativeElement;
        this.httpClientService.delete({
          controller: this.controller,
        }, this.id).subscribe({
          complete: () => {
            $(td.parentElement).animate({
              opacity: 0,
              left: "+=50",
              height: "toogle"
            }, 1800, () => {
              this.callBack.emit();
              this.alertifyService.message("Ürün başarıyla silinmiştir.", {
                dismissOthers: true,
                messageType: MessageType.Success,
                position: Position.TopRight
              })
            });
          },
          error: (errorResponse: HttpErrorResponse) => {
            this.spinner.hide(SpinnerType.BallFussion);
            this.alertifyService.message("Ürün silinirken bir hatayla karşılaşıldı!", {
              dismissOthers: true,
              messageType: MessageType.Error,
              position: Position.TopRight
            })
          }
        });
      }
    });
  }

}
