import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DragonBallService } from './shared/services/dragon-ball.service';
import { Character, FilterResponse } from './shared/models/character.interface';
import { ApiResponse } from './shared/models/api-response.interface';
import { GenderData, RaceData, AfilliationData } from './shared/models/data-filter.model';

@Component({
	selector: 'app-root',
	standalone: true,
	imports: [RouterOutlet, CommonModule, ReactiveFormsModule],
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
	characters: Character[] = [];
	searchForm: FormGroup;
	genders: FilterResponse[] = GenderData;
	races: FilterResponse[] = RaceData;
	affiliations: FilterResponse[] = AfilliationData;
	loading = false;
	LIMIT_RESULT = 16;
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
		this.onSearch();
	}

	initializeTheme(): void {
		if (isPlatformBrowser(this.platformId)) {
			this.isDarkMode = this.getStoredTheme() === 'dark' || window.matchMedia('(prefers-color-scheme: dark)').matches;
			this.updateTheme();
		}
	}

	loadCharacters(start: number, page: number, limit: number): void {
		this.loading = true;
		const { name, gender, race, affiliation } = this.searchForm.value;

		this.dragonBallService.getCharacters(start, page, limit, name, gender, race, affiliation)
			.subscribe((response: ApiResponse) => {
				this.characters = response.items ?? response;
				this.loading = false;
			});
	}

	onSearch(): void {
		this.loadCharacters(0, 1, this.LIMIT_RESULT);
	}

	resetForm(): void {
		this.searchForm.reset();
		this.onSearch();
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