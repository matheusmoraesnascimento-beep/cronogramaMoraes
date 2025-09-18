import { Component, OnInit, inject, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';

// Interfaces (não mudam)
interface MicroTopic { title: string; content: string; }
interface StudyDay { day: string; duration: string; macroTopic: string; microTopics: MicroTopic[]; type: 'study' | 'review' | 'general-review' | 'catch-up'; status: 'pending' | 'completed';}
interface StudyWeek { title: string; days: StudyDay[]; }
interface StudyCycle { title: string; weeks: StudyWeek[]; }

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule, FormsModule, MatToolbarModule, MatExpansionModule, MatCardModule,
    MatCheckboxModule, MatListModule, MatIconModule, MatDividerModule, MatProgressSpinnerModule,
    MatSnackBarModule, MatFormFieldModule, MatInputModule,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  private http = inject(HttpClient);
  private snackBar = inject(MatSnackBar);
  private cdr = inject(ChangeDetectorRef);

  studyPlan: StudyCycle[] = [];
  loading = true;
  private readonly apiUrl = 'https://39auyife9f.execute-api.us-east-1.amazonaws.com/dev/cronograma';

  ngOnInit() {
    this.loadStudyPlanFromBackend();
  }

  loadStudyPlanFromBackend() {
    this.loading = true;
    this.http.get<StudyCycle[]>(this.apiUrl).subscribe({
      next: (data) => {
        this.studyPlan = data;
        this.loading = false;
        this.showMessage('Cronograma carregado com sucesso!');
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Erro ao buscar cronograma:', err);
        this.loading = false;
        this.showMessage('Falha ao carregar cronograma do backend!', 'error');
        this.cdr.detectChanges();
      }
    });
  }

  // --- LÓGICA DE SALVAMENTO ATUALIZADA ---

  // NOVA FUNÇÃO CENTRALIZADA PARA SALVAR OS DADOS
  saveStudyPlanToBackend() {
    // Usamos o método POST para enviar o objeto studyPlan inteiro para o backend
    this.http.post(this.apiUrl, this.studyPlan).subscribe({
      next: () => {
        console.log("Cronograma salvo com sucesso no backend.");
        this.showMessage('Alterações salvas!', 'success');
      },
      error: (err) => {
        console.error('Erro ao salvar o cronograma:', err);
        this.showMessage('Erro ao salvar as alterações!', 'error');
        // Opcional: Recarregar os dados para reverter a mudança visual
        // this.loadStudyPlanFromBackend();
      }
    });
  }

  // FUNÇÕES DE AÇÃO ATUALIZADAS PARA CHAMAR O SALVAMENTO
  toggleStatus(day: StudyDay): void {
    // 1. Altera o status na tela
    day.status = day.status === 'pending' ? 'completed' : 'pending';
    // 2. Envia a alteração para o backend
    this.saveStudyPlanToBackend();
  }

  onContentChange(): void {
    // Quando o usuário termina de digitar e clica fora (evento blur),
    // a função de salvar é chamada.
    this.saveStudyPlanToBackend();
  }

  private showMessage(message: string, type: 'success' | 'error' = 'success'): void {
    this.snackBar.open(message, 'Fechar', {
      duration: 2000,
      panelClass: type === 'error' ? 'error-snackbar' : 'success-snackbar'
    });
  }
}

