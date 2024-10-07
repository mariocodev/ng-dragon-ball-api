import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Character } from './shared/models/character.interface';
import { DragonBallService } from './shared/services/dragon-ball.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  characters: Character[] = [];
  constructor(private __dragonBallService: DragonBallService) {}

  ngOnInit(): void {
    this.__dragonBallService.getCharacters().subscribe({
      next: (response) => {
        this.characters = response.items;
      },
      error: (error) => {
        console.error('Error fetching characters:', error);
      },
    });
  }
}
