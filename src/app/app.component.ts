import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DragonBallService } from './shared/services/dragon-ball.service';
import { Character, FilterResponse } from './shared/models/character.interface';
import { ApiResponse } from './shared/models/api-response.interface';
import { GenderData, RaceData, AfilliationData } from './shared/models/data-filter.model';
import { CharacterDetailsComponent } from './pages/character-details/character-details.component';

@Component({
	selector: 'app-root',
	standalone: true,
	imports: [RouterOutlet, CommonModule, ReactiveFormsModule, CharacterDetailsComponent],
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
	
	searchForm: FormGroup;
	loading = false;

	genders: FilterResponse[] = GenderData;
	races: FilterResponse[] = RaceData;
	affiliations: FilterResponse[] = AfilliationData;
	
	characters: Character[] = [];
	charactersFilter: Character[] = []; // Almacena solo los personajes de la página actual	
	characterId!: number;
	totalPages: number = 0; // Total de páginas
	currentPage: number = 1; // Para el seguimiento de la página actual
	itemsPerPage: number = 8; // Elementos por página
	isFilter: boolean = false;
	openModal = false;
	
	isDarkMode = false;

	constructor(
		private dragonBallService: DragonBallService,
		private fb: FormBuilder,
		@Inject(PLATFORM_ID) private platformId: Object
	) {
		this.searchForm = this.fb.group({
			name: [''],
			gender: [''],
			race: [''],
			affiliation: [''],
			sort: ['']
		});
	}

	ngOnInit(): void {
		this.initializeTheme();
		this.onLoad();
	}

	initializeTheme(): void {
		if (isPlatformBrowser(this.platformId)) {
			this.isDarkMode = this.getStoredTheme() === 'dark' || window.matchMedia('(prefers-color-scheme: dark)').matches;
			this.updateTheme();
		}
	}

	onLoadCharacters(page: number): void {
		this.loading = true;

		this.dragonBallService.getCharactersNoFilter(page, this.itemsPerPage)
			.subscribe((response: ApiResponse) => {
				this.characters = response.items ?? [];
				this.totalPages = response.meta.totalPages;
				this.currentPage = response.meta.currentPage;
				
				this.isFilter = false;
				this.loading = false;
			});
	}

	onFilterCharacters(): void {
		this.loading = true;
		const { name, gender, race, affiliation } = this.searchForm.value;

		this.dragonBallService.getCharactersByFilter(1, this.itemsPerPage, name, gender, race, affiliation)
			.subscribe((response: Character[]) => {
				this.charactersFilter = response ?? [];
				this.totalPages = Math.ceil(this.charactersFilter.length / this.itemsPerPage);
				console.log("totalPages:", this.totalPages)
				this.currentPage = 1;
				this.updateDisplayedCharacters();
				this.isFilter = true;
				this.loading = false;
			});
	}

	getColorRace(race: string) {
		const raceItem = this.races.find(e => e.value === race);
		return raceItem?.color;
	}

	setCharacterById(id: number): void{
		console.log("Initial openModal: ", this.openModal);
		this.characterId = id;
		this.openModal = true;
		console.log("filterBy: ", id, " - openModal: ", this.openModal);
	}

	handleCloseModal() {
		this.openModal = false;
	}

	updateDisplayedCharacters(): void {
		const startIndex = (this.currentPage - 1) * this.itemsPerPage;
		const endIndex = startIndex + this.itemsPerPage;
		console.log("startIndex: ", startIndex, " - endIndex: ", endIndex);
		this.characters = this.charactersFilter.slice(startIndex, endIndex);
		console.log("this.displayedCharacter: ", this.characters);
	}

	goToPage(page: number): void {
		if (page >= 1 && page <= this.totalPages) {
		  this.onLoadCharacters(page);
		}
	}

	onPageChange(page: number): void {
		console.log("page:", page);
		//this.onLoadCharacters((page /*- 1*/) * this.itemsPerPage);
		this.currentPage = page;
		this.updateDisplayedCharacters();
	}

	onLoad(): void {
		this.onLoadCharacters(this.currentPage);
	}

	resetForm(): void {
		this.searchForm.reset();
		this.onLoad();
	}

	toggleDarkMode(): void {
		this.isDarkMode = !this.isDarkMode;
		
		if (isPlatformBrowser(this.platformId)) {
		  	this.storeTheme(this.isDarkMode ? 'dark' : 'light');
		}
	
		this.updateTheme();
	}

	private getStoredTheme(): string | null {
		if (isPlatformBrowser(this.platformId)) {
			return localStorage.getItem('theme');
		}
		return null;
	}

	private storeTheme(theme: string): void {
		if (isPlatformBrowser(this.platformId)) {
			localStorage.setItem('theme', theme);
		}
	}

	updateTheme(): void {
		if (isPlatformBrowser(this.platformId)) {
			if (this.isDarkMode) {
				document.documentElement.classList.add('dark');
			} else {
				document.documentElement.classList.remove('dark');
			}
		}
	}
}