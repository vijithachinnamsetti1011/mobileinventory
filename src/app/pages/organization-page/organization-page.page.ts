import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonItem, IonSearchbar, IonIcon, IonButton, IonLabel, IonFooter } from '@ionic/angular/standalone';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { SearchBarComponent } from "src/app/common-components/search-bar/search-bar.component";
import { addIcons } from 'ionicons';
import { business, businessSharp, checkmarkCircle } from 'ionicons/icons';
import { Subscription } from 'rxjs';
import { SqLiteService } from 'src/app/services/sq-lite-service';
import { NavController } from '@ionic/angular'

@Component({
  selector: 'app-organization-page',
  templateUrl: './organization-page.page.html',
  styleUrls: ['./organization-page.page.scss'],
  standalone: true,
  imports: [IonButton, IonIcon, IonItem, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonList, SearchBarComponent, IonFooter]
})
export class OrganizationPagePage implements OnInit, OnDestroy {

  orgId: string | null = null;
  metadata: string[] = [];
  organizations: any[] = [];
  filteredOrganizations: any[] = [];
  selectedOrg: any = null;
  subscription!: Subscription;

  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router, private sql: SqLiteService, private nav: NavController) {
    addIcons({ checkmarkCircle, businessSharp, business });
  }

  ngOnInit() {
    this.organizationdetails()
  }

  async organizationdetails() {
    this.organizations = await this.sql.getOrganizationDetails('Organization');
    console.log('Data from DB:', this.organizations);
    this.filteredOrganizations = [...this.organizations];
  }

  async onSearch(term: string) {
    if (!term.trim()) {
      this.filteredOrganizations = [...this.organizations];
      return;
    }
    this.filteredOrganizations = await this.sql.searchOrganizations('Organization', term);
  }

  selectOrganization(org: any) {
    if (this.selectedOrg?.InventoryOrgId === org.InventoryOrgId) {
      this.selectedOrg = null;
      localStorage.removeItem('InventoryOrgId');
      localStorage.removeItem('InventoryOrgCode');
    } else {
      this.selectedOrg = org;
      localStorage.setItem('InventoryOrgId', this.selectedOrg.InventoryOrgId);
      localStorage.setItem('InventoryOrgCode', this.selectedOrg.InventoryOrgCode);
    }
  }

  continue() {
    console.log("....InventoryOrgId", localStorage.getItem("InventoryOrgId"));
    this.nav.navigateForward(['activity'])
  }


  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
