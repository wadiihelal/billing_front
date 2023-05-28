import { Component, OnInit } from "@angular/core";
import { NgxSpinnerService } from "ngx-spinner";
import { MenuItem } from "primeng/api";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { delay } from "rxjs";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { ArchiveComponent } from "./archive/archive.component";
import { KeycloakService } from "keycloak-angular";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  items!: MenuItem[];
  StationNames!: any;
  username: any = "";
  isLoggedIn: any;
  roles: any;
  constructor(
    private spinner: NgxSpinnerService,
    public dialog: MatDialog,
    private keycloakService: KeycloakService
  ) {}
  ngOnInit() {
    this.initUserInfos();
    this.initUserOptions();
     if(!this.checkIfHasRole(['Billing'])){
       this.logOut();

     }

    this.items = [
      {
        label: "File",
        routerLink: "page1",
      },
      {
        label: "Edit",
        icon: "pi pi-fw pi-pencil",
        items: [
          { label: "Delete", icon: "pi pi-fw pi-trash" },
          { label: "Refresh", icon: "pi pi-fw pi-refresh" },
        ],
      },
    ];
  }
  openDialog() {
    this.dialog
      .open(ArchiveComponent, { width: "80%", height: "auto" })
      .afterClosed()
      .subscribe((result: any) => {});
  }

  initUserInfos() {
    this.keycloakService.loadUserProfile(false).then((data: any) => {
      console.log("user data ", data);
      this.username = data.firstName + "." + data.lastName.substr(0, 1);
    });
  }

  initUserOptions() {
    this.isLoggedIn = this.keycloakService
      .isLoggedIn()
      .then((value) => {
        console.log("logged in ? => ", value);
        this.isLoggedIn = value;
      })
      .catch((error) => console.error(error));
    if (this.isLoggedIn) {
      this.username = this.keycloakService.getUsername();
      this.roles = this.keycloakService.getUserRoles();
      console.log(this.roles);
    }
  }

  checkIfHasRole(roles: any): boolean {
    const requiredRoles = roles;
    console.log(
      "has required roles =>",
      requiredRoles.every((role: any) => this.roles.includes(role))
    );
    return requiredRoles.every((role: any) => this.roles.includes(role));
  }

  logOut() {
    this.keycloakService.logout();
  }
}
