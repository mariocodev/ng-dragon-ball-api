import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Character } from '../../shared/models/character.interface';
import { DragonBallService } from '../../shared/services/dragon-ball.service';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-character-details',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './character-details.component.html',
    styleUrl: './character-details.component.scss'
})
export class CharacterDetailsComponent implements OnChanges  {

	@Input() id!: number;
	@Input() isOpen: boolean = false;
	@Output() closeModalEvent = new EventEmitter<void>();

	character!: Character;
	loading: boolean = false;

	constructor(
		private dragonBallService: DragonBallService) {}

	ngOnInit(): void {	}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes['id'] && changes['id'].currentValue) {
			this.getCharacterById(changes['id'].currentValue);
		}
	}

	getCharacterById(id: number): void {
		this.loading = true;
		this.dragonBallService.getCharactersById(id)
			.subscribe((response: Character) =>
			{
				this.character = response;
				this.loading = false;
				console.log(this.character);
			}
		);
	}

	closeModal() {
		this.isOpen = false;
		this.closeModalEvent.emit();
	}
}
