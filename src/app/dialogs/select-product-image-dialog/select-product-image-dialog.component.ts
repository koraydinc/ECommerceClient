import { Component, Inject, Output } from '@angular/core';
import { BaseDialog } from '../base/base-dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FileUploadOptions } from '../../services/common/file-upload/file-upload.component';
import { ProductService } from '../../services/common/models/product.service';
import { List_Product_Image } from '../../contracts/list_product_image';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerType } from '../../base/base.component';
import { DialogService } from '../../services/common/dialog.service';
import { DeleteDialogComponent, DeleteState } from '../delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-select-product-image-dialog',
  templateUrl: './select-product-image-dialog.component.html',
  styleUrl: './select-product-image-dialog.component.scss'
})
export class SelectProductImageDialogComponent extends BaseDialog<SelectProductImageDialogComponent> {
  constructor(
    dialogRef: MatDialogRef<SelectProductImageDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: SelectProductImageState | string,
    private productService: ProductService,
    private spinner: NgxSpinnerService,
    private dialogService: DialogService
  ) {
    super(dialogRef);
  }

  @Output() options: Partial<FileUploadOptions> = {
    accept: ".png, .jpg, .jpeg, .gif",
    action: "upload",
    controller: "products",
    explanation: "Ürün fotoğrafını ilgili alana sürükleyebilirsiniz!",
    isAdminPage: true,
    queryString: `id=${this.data}`
  }

  images: List_Product_Image[];

  async ngOnInit() {
    await this.loadImages();
  }

  async loadImages() {
    this.spinner.show(SpinnerType.BallFussion);
    this.images = await this.productService.readImages(this.data as string, () => {
      this.spinner.hide(SpinnerType.BallFussion);
    });
  }

  async deleteImage(id: string) {
    this.dialogService.openDialog({
      componentType: DeleteDialogComponent,
      data: DeleteState.Yes,
      afterClosed: async () => {
        this.spinner.show(SpinnerType.BallFussion);
        await this.productService.deleteImage(this.data as string, id, () => {
          this.loadImages();
          this.spinner.hide(SpinnerType.BallFussion);
        })
      }
    })

  }
}

export enum SelectProductImageState {
  Close
}