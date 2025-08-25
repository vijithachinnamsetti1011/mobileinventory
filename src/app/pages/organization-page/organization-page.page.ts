import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonItem, IonSearchbar, IonIcon, IonButton } from '@ionic/angular/standalone';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { SearchBarComponent } from "src/app/common-components/search-bar/search-bar.component";
import { addIcons } from 'ionicons';
import { business, businessSharp, checkmarkCircle } from 'ionicons/icons';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-organization-page',
  templateUrl: './organization-page.page.html',
  styleUrls: ['./organization-page.page.scss'],
  standalone: true,
  imports: [IonButton, IonIcon, IonItem, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonList, SearchBarComponent]
})
export class OrganizationPagePage implements OnInit, OnDestroy {

  orgId: string | null = null;
  metadata: string[] = [];
  organizations: any[] = [];
  filteredOrganizations: any[] = [];
  selectedOrg: any = null;
  subscription!: Subscription;

  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router) {
    addIcons({checkmarkCircle,businessSharp,business});
  }

  ngOnInit() {
    this.orgId = this.route.snapshot.paramMap.get('orgId');
    console.log("Organization ID:", this.orgId);
    if (this.orgId) {
      this.getOrganizationDetails(this.orgId);
    }
  }
  getOrganizationDetails(orgId: string) {
    this.subscription = this.http.get<any>(`${environment.organizationURL}${orgId}`).subscribe({
      next: (res) => {
        console.log("API Response:", res);
        this.metadata = res[0].map((col: string) =>
          col.endsWith("_PK") ? col.replace("_PK", "") : col
        );
        this.organizations = res.slice(1);
        this.filteredOrganizations = [...this.organizations];
        console.log("Metadata:", this.metadata);
        console.log("Organizations:", this.organizations);
      },
      error: (err) => {
        console.error("API Error:", err);
      }
    });
  }

  onSearch(term: string = '') {
    const lowerTerm = term.toLowerCase();
    if (!term) {
      this.filteredOrganizations = [...this.organizations];
    } else {
      this.filteredOrganizations = this.organizations.filter(row =>
        row.some((field: any) =>
          field?.toString().toLowerCase().includes(lowerTerm)
        )
      );
    }
  }
  selectOrganization(org: any) {
    this.selectedOrg = org;
    console.log('Selected organization:', org);
  }
  continue() {
  }
  ngOnDestroy() {
    if(this.subscription){
      this.subscription.unsubscribe();
    }
  }
  
}
