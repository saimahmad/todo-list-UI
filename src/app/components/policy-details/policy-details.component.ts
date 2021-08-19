import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PolicyService } from '../policy.service';

@Component({
  selector: 'app-policy-details',
  templateUrl: './policy-details.component.html',
  styleUrls: ['./policy-details.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class PolicyDetailsComponent implements OnInit {
  searchType: string = "p";
  policy_id: number | undefined;
  customer_id: number | undefined;
  policyList: number[] = [];
  policyForm: FormGroup | undefined;
  dateOfPurchase: string = "";
  isEdit: boolean = false;
  constructor(private policyService: PolicyService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.policyForm = new FormGroup({
      date_of_purchase: new FormControl(''),
      fuel: new FormControl(''),
      vehicle_segment: new FormControl(''),
      premium: new FormControl(''),
      bodily_injury_liability: new FormControl(''),
      personal_injury_protection: new FormControl(''),
      property_damage_liability: new FormControl(''),
      collision: new FormControl(''),
      comprehensive: new FormControl(''),
      customer_gender: new FormControl(''),
      customer_income_group: new FormControl(''),
      customer_region: new FormControl(''),
      customer_martial_status: new FormControl(''),
    })
  }


  getPolicyDetails() {
    this.policyService.getPolicyDetails(Number(this.policy_id)).subscribe((data:any) => {
      this.customer_id = data.customer_id;
      this.dateOfPurchase = data.date_of_purchase.split("T")[0].split("-").reverse().join("-");
      this.policyForm?.get("date_of_purchase")?.patchValue(data.date_of_purchase)
      this.policyForm?.get("fuel")?.patchValue(data.fuel)
      this.policyForm?.get("vehicle_segment")?.patchValue(data.vehicle_segment)
      this.policyForm?.get("premium")?.patchValue(data.premium)
      this.policyForm?.get("bodily_injury_liability")?.patchValue(data.bodily_injury_liability)
      this.policyForm?.get("personal_injury_protection")?.patchValue(data.personal_injury_protection)
      this.policyForm?.get("property_damage_liability")?.patchValue(data.property_damage_liability)
      this.policyForm?.get("collision")?.patchValue(data.collision)
      this.policyForm?.get("comprehensive")?.patchValue(data.comprehensive)
      this.policyForm?.get("customer_gender")?.patchValue(data.customer_gender)
      this.policyForm?.get("customer_income_group")?.patchValue(data.customer_income_group)
      this.policyForm?.get("customer_region")?.patchValue(data.customer_region)
      this.policyForm?.get("customer_martial_status")?.patchValue(data.customer_martial_status)
    },error => {
      console.log(error)
      this.openErrorSnackbar(error.error.error)
    })
  }

  getPolicyList() {
    this.policyService.getPolicyList(Number(this.customer_id)).subscribe((data:any) => {
      this.policyList = data.map((item:any) => item.policy_id)
      this.policy_id = this.policyList[0];
      this.getPolicyDetails()
    },(error) => {
      this.openErrorSnackbar(error.error.error)
      console.log(error)
    })
  }

  savePolicy() {
    let payload = this.policyForm?.value;
    payload.policy_id = this.policy_id;
    payload.customer_id = this.customer_id
    this.policyService.savePolicyDetails(payload).subscribe((data:any) => {
      this.openSuccessSnackbar(data.msg)
    },error => {
      console.log(error)
    })
  }

  openErrorSnackbar(error: string) {
    this.snackBar.open(error, '', {
      duration: 2000,
      horizontalPosition: "center",
      verticalPosition: "bottom",
      panelClass: ["red-snackbar"]
    });
  }

  openSuccessSnackbar(msg: string) {
    this.snackBar.open(msg, '', {
      duration: 2000,
      horizontalPosition: "center",
      verticalPosition: "bottom",
      panelClass: ["green-snackbar"]
    });
  }

  toggleEdit() {
    this.isEdit = !(this.isEdit)
  }

}
