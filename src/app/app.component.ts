import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FormBuilder, FormGroup, FormArray, ReactiveFormsModule } from '@angular/forms';

import { Character } from './shared/models/character.interface';
import { DragonBallService } from './shared/services/dragon-ball.service';
import { ApiResponse } from './shared/models/api-response.interface';
import { environment } from '../environments/environment';
import { AfilliationData, FilterResponse, GenderData, RaceData } from './shared/models/data-filter.model';

@Component({
	selector: 'app-root',
	standalone: true,
	imports: [RouterOutlet, CommonModule, ReactiveFormsModule],
	templateUrl: './app.component.html',
	styleUrl: './app.component.scss'
})
export class AppComponent  implements OnInit {

	characters: Character[] = [];
	searchForm: FormGroup;
	genders: FilterResponse[] = GenderData;
	races: FilterResponse[] = RaceData;
	affiliations: FilterResponse[] = AfilliationData;
	loading: boolean = false;

	ENV: boolean = environment.production;

	LIMIT_RESULT: number = 16;

	constructor(
		private __dragonBallService: DragonBallService,
		private fb: FormBuilder
	) {
		// Inicializa el formulario
		this.searchForm = this.fb.group({
			name: [''],
			gender: [''],
			race: [''],
			affiliation: [''],
			sort: ['']
		});
	}

	ngOnInit(): void {
		this.onSearch();
		this.createGenderOptions();
		this.createRaceOptions();
		this.createAffiliationsOptions();
	}

	loadCharacters(start: number, page: number, limit: number/*, name?: string, gender?: string, race?: string, affiliation?: string*/) {
		this.loading = true;
		const { name, gender, race, affiliation } = this.searchForm.value;
		this.__dragonBallService.getCharacters(start, page, limit, name, gender, race, affiliation)
			.subscribe((response: ApiResponse) => {
				this.characters = response.items ?? response;
				this.loading = false
				//console.log(response);
			});
	}

	// Formulario
	createGenderOptions() {
		this.genders.forEach(gender => {
		  	this.searchForm.addControl(gender.value, this.fb.control(false));
		});
	}

	createRaceOptions() {	
		this.races.forEach(race => {
		  	this.searchForm.addControl(race.value, this.fb.control(false));
		});
	}

	createAffiliationsOptions() {	
		this.affiliations.forEach(affiliation => {
		  	this.searchForm.addControl(affiliation.value, this.fb.control(false));
		});
	}

	onSearch() {

		this.loadCharacters(0, 1, this.LIMIT_RESULT); // Reinicia la búsqueda al primer conjunto de resultados
	}
	
	resetForm() {
		this.searchForm.reset(); // Resetea todos los campos del formulario
	}

	resetFormFieldsetGender(): void {
		this.searchForm.reset();
		//this.onSearch();
	}
}
