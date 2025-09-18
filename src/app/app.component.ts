import { Component, ChangeDetectionStrategy, OnInit, inject, ChangeDetectorRef } from '@angular/core';
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


// Firebase imports
import { Firestore, doc, setDoc, getDoc } from '@angular/fire/firestore';

// NOVA INTERFACE para os micro-tópicos
interface MicroTopic {
  title: string;
  content: string; // Campo para suas anotações
}

interface StudyDay {
  day: string;
  duration: string;
  macroTopic: string;
  microTopics: MicroTopic[]; // ATUALIZADO de string[] para MicroTopic[]
  type: 'study' | 'review' | 'general-review' | 'catch-up';
  status: 'pending' | 'completed';
}

interface StudyWeek {
  title: string;
  days: StudyDay[];
}

interface StudyCycle {
  title: string;
  weeks: StudyWeek[];
}

interface StudyPlanDocument {
  id: string;
  studyPlan: StudyCycle[];
  lastUpdated: Date;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule, // <-- ADICIONADO
    MatToolbarModule,
    MatExpansionModule,
    MatCardModule,
    MatCheckboxModule,
    MatListModule,
    MatIconModule,
    MatDividerModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatFormFieldModule, // <-- ADICIONADO
    MatInputModule,     // <-- ADICIONADO
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  private firestore = inject(Firestore);
  private snackBar = inject(MatSnackBar);
  private cdr = inject(ChangeDetectorRef);

  studyPlan: StudyCycle[] = [];
  loading = false;
  private readonly DOCUMENT_ID = 'matheus-study-plan';

  // ATUALIZADO: O array defaultStudyPlan agora segue a nova estrutura de MicroTopic
  private readonly defaultStudyPlan: StudyCycle[] = [
    {
      title: 'Ciclo 1: Governança, Segurança e Engenharia de Software',
      weeks: [
        {
          title: 'Foco em Governança de TI',
          days: [
            { day: 'Segunda', duration: '2 horas', macroTopic: 'Governança de TI', type: 'study', status: 'pending', microTopics: [
                { title: 'COBIT: Governança de riscos', content: '' }, { title: 'Alinhamento com ITIL', content: '' }, { title: 'Atualizações (COBIT 5 para 2019)', content: '' }
            ]},
            { day: 'Terça', duration: '1 hora', macroTopic: 'Revisão Ativa', type: 'review', status: 'pending', microTopics: [
                { title: 'Revisar anotações de COBIT', content: '' }, { title: 'Fazer 5-10 questões sobre o tema', content: '' }
            ]},
            { day: 'Quarta', duration: '2 horas', macroTopic: 'Governança de TI', type: 'study', status: 'pending', microTopics: [
                { title: 'ITIL: Gestão de serviços', content: '' }, { title: 'Relação com PMBOK', content: '' }, { title: 'Integração com COBIT', content: '' }
            ]},
            { day: 'Quinta', duration: '1 hora', macroTopic: 'Revisão Ativa', type: 'review', status: 'pending', microTopics: [
                { title: 'Revisar anotações de ITIL', content: '' }, { title: 'Fazer 5-10 questões sobre o tema', content: '' }
            ]},
            { day: 'Sexta', duration: '2 horas', macroTopic: 'Gerenciamento de Projetos', type: 'study', status: 'pending', microTopics: [
                { title: 'PMBOK: Conceitos de PMO', content: '' }, { title: 'Comparação com COBIT/ITIL', content: '' }, { title: 'Artefatos visuais (diagramas)', content: '' }
            ]},
          ],
        },
        {
          title: 'Finalizando Governança e iniciando Segurança',
          days: [
            { day: 'Segunda', duration: '2 horas', macroTopic: 'Legislação Aplicada a TI', type: 'study', status: 'pending', microTopics: [
                { title: 'Licitações: Lei nº 14.133/2021', content: '' }, { title: 'Modalidades de concorrência', content: '' }, { title: 'Inexigibilidade, Contratos e SLA', content: '' }
            ]},
            { day: 'Terça', duration: '1 hora', macroTopic: 'Revisão Ativa', type: 'review', status: 'pending', microTopics: [
                { title: 'Revisar anotações de Legislação', content: '' }, { title: 'Focar nos principais artigos', content: '' }
            ]},
            { day: 'Quarta', duration: '2 horas', macroTopic: 'Segurança da Informação', type: 'study', status: 'pending', microTopics: [
                { title: 'Normas ISO/ABNT 27001 e 27002', content: '' }, { title: 'Gestão de incidentes, Controles', content: '' }
            ]},
            { day: 'Quinta', duration: '1 hora', macroTopic: 'Revisão Ativa', type: 'review', status: 'pending', microTopics: [
                { title: 'Revisar anotações das normas ISO', content: '' }, { title: 'Focar nos objetivos dos controles', content: '' }
            ]},
            { day: 'Sexta', duration: '2 horas', macroTopic: 'Segurança da Informação', type: 'study', status: 'pending', microTopics: [
                { title: 'ISO 27005 (Análise de Riscos)', content: '' }, { title: 'Série X.509 (Certificados Digitais)', content: '' }
            ]},
          ]
        },
        {
          title: 'Aprofundando em Segurança e iniciando Eng. de Software',
          days: [
            { day: 'Segunda', duration: '2 horas', macroTopic: 'Segurança de Redes', type: 'study', status: 'pending', microTopics: [
                { title: 'Protocolos: VPN, SSL/TLS', content: '' }, { title: 'IPSec (protocolos AH e ESP)', content: '' }
            ]},
            { day: 'Terça', duration: '1 hora', macroTopic: 'Revisão Ativa', type: 'review', status: 'pending', microTopics: [
                { title: 'Revisar anotações de protocolos', content: '' }, { title: 'Entender camadas de atuação', content: '' }
            ]},
            { day: 'Quarta', duration: '2 horas', macroTopic: 'Segurança de Redes', type: 'study', status: 'pending', microTopics: [
                { title: 'Redes sem Fio: EAP, WEP, WPA/WPA2', content: '' }, { title: 'Sistemas de Detecção de Intrusão (IDS/IPS)', content: '' }
            ]},
            { day: 'Quinta', duration: '1 hora', macroTopic: 'Revisão Ativa', type: 'review', status: 'pending', microTopics: [
                { title: 'Revisar segurança wireless e IDS/IPS', content: '' }
            ]},
            { day: 'Sexta', duration: '2 horas', macroTopic: 'Engenharia de Software', type: 'study', status: 'pending', microTopics: [
                { title: 'Scrum: Ciclo, Sprints, Papéis', content: '' }, { title: 'Kanban: Fluxo, Quadros, Pull', content: '' }
            ]},
          ]
        },
        {
          title: 'Foco em Engenharia e Qualidade de Software',
          days: [
            { day: 'Segunda', duration: '2 horas', macroTopic: 'Engenharia de Software', type: 'study', status: 'pending', microTopics: [
                { title: 'Comparação: XP, Scrum, FDD, Lean', content: '' }, { title: 'Conceitos ágeis gerais', content: '' }
            ]},
            { day: 'Terça', duration: '1 hora', macroTopic: 'Revisão Ativa', type: 'review', status: 'pending', microTopics: [
                { title: 'Revisar metodologias ágeis', content: '' }
            ]},
            { day: 'Quarta', duration: '2 horas', macroTopic: 'Ciclo de Vida do Software', type: 'study', status: 'pending', microTopics: [
                { title: 'Engenharia de Requisitos', content: '' }
            ]},
            { day: 'Quinta', duration: '1 hora', macroTopic: 'Revisão Ativa', type: 'review', status: 'pending', microTopics: [
                { title: 'Revisar anotações de Requisitos', content: '' }
            ]},
            { day: 'Sexta', duration: '2 horas', macroTopic: 'Qualidade de Software', type: 'study', status: 'pending', microTopics: [
                { title: 'Qualidade e Testes, CMMI, APF', content: '' }
            ]},
          ]
        },
        {
          title: 'Revisão Geral do Ciclo 1',
          days: [
            { day: 'Segunda', duration: '2 horas', macroTopic: 'Revisão Geral', type: 'general-review', status: 'pending', microTopics: [
                { title: 'Governança e Gerenciamento de TI', content: '' }, { title: 'Simulado de 15 questões', content: '' }
            ]},
            { day: 'Terça', duration: '1 hora', macroTopic: 'Revisão Rápida', type: 'general-review', status: 'pending', microTopics: [
                { title: 'Revisar pontos de dificuldade', content: '' }
            ]},
            { day: 'Quarta', duration: '2 horas', macroTopic: 'Revisão Geral', type: 'general-review', status: 'pending', microTopics: [
                { title: 'Segurança da Informação', content: '' }, { title: 'Simulado de 15 questões', content: '' }
            ]},
            { day: 'Quinta', duration: '1 hora', macroTopic: 'Revisão Rápida', type: 'general-review', status: 'pending', microTopics: [
                { title: 'Revisar pontos de dificuldade', content: '' }
            ]},
            { day: 'Sexta', duration: '2 horas', macroTopic: 'Revisão Geral', type: 'general-review', status: 'pending', microTopics: [
                { title: 'Engenharia de Software', content: '' }, { title: 'Simulado de 15 questões', content: '' }
            ]},
          ]
        }
      ],
    },
    {
      title: 'Ciclo 2: Bancos de Dados, IA, Redes e Desenvolvimento',
      weeks: [
        {
          title: 'Foco em Banco de Dados',
          days: [
            { day: 'Segunda', duration: '2 horas', macroTopic: 'Banco de Dados Relacional', type: 'study', status: 'pending', microTopics: [
                { title: 'SQL: DCL (GRANT, REVOKE)', content: '' }, { title: 'Otimização (EXPLAIN)', content: '' }
            ]},
            { day: 'Terça', duration: '1 hora', macroTopic: 'Revisão Ativa', type: 'review', status: 'pending', microTopics: [
                { title: 'Praticar comandos DCL', content: '' }
            ]},
            { day: 'Quarta', duration: '2 horas', macroTopic: 'Banco de Dados Relacional', type: 'study', status: 'pending', microTopics: [
                { title: 'Modelagem, 4ª Forma Normal', content: '' }
            ]},
            { day: 'Quinta', duration: '1 hora', macroTopic: 'Revisão Ativa', type: 'review', status: 'pending', microTopics: [
                { title: 'Revisar formas normais', content: '' }
            ]},
            { day: 'Sexta', duration: '2 horas', macroTopic: 'Banco de Dados NoSQL', type: 'study', status: 'pending', microTopics: [
                { title: 'Tipos, Teorema CAP', content: '' }
            ]},
          ]
        },
        {
          title: 'Finalizando BD e iniciando Análise de Dados/IA',
          days: [
            { day: 'Segunda', duration: '2 horas', macroTopic: 'Conceitos Gerais de BD', type: 'study', status: 'pending', microTopics: [
                { title: 'Big Data e Transações: HDFS', content: '' }, { title: 'Protocolo de bloqueio de duas fases', content: '' }, { title: 'Índices', content: '' }
            ]},
            { day: 'Terça', duration: '1 hora', macroTopic: 'Revisão Ativa', type: 'review', status: 'pending', microTopics: [
                { title: 'Revisar HDFS, bloqueio e índices', content: '' }
            ]},
            { day: 'Quarta', duration: '2 horas', macroTopic: 'Análise de Dados e IA', type: 'study', status: 'pending', microTopics: [
                { title: 'Machine Learning: Naive Bayes', content: '' }, { title: 'Modelos supervisionados vs. não', content: '' }
            ]},
            { day: 'Quinta', duration: '1 hora', macroTopic: 'Revisão Ativa', type: 'review', status: 'pending', microTopics: [
                { title: 'Revisar conceitos de ML', content: '' }
            ]},
            { day: 'Sexta', duration: '2 horas', macroTopic: 'Análise de Dados e IA', type: 'study', status: 'pending', microTopics: [
                { title: 'Python (Pandas, Keras), Métricas', content: '' }, { title: 'Pré-processamento, Entropia', content: '' }
            ]},
          ]
        },
        {
          title: 'Finalizando IA e focando em Redes',
          days: [
            { day: 'Segunda', duration: '2 horas', macroTopic: 'Análise de Dados e IA', type: 'study', status: 'pending', microTopics: [
                { title: 'IA Generativa (ChatGPT)', content: '' }, { title: 'Processo de ETL, PLN, Dados Abertos', content: '' }
            ]},
            { day: 'Terça', duration: '1 hora', macroTopic: 'Revisão Ativa', type: 'review', status: 'pending', microTopics: [
                { title: 'Revisar IA Generativa e ETL', content: '' }
            ]},
            { day: 'Quarta', duration: '2 horas', macroTopic: 'Redes de Computadores', type: 'study', status: 'pending', microTopics: [
                { title: 'Protocolos de Roteamento: BGP, AS', content: '' }, { title: 'Protocolo IGMP', content: '' }
            ]},
            { day: 'Quinta', duration: '1 hora', macroTopic: 'Revisão Ativa', type: 'review', status: 'pending', microTopics: [
                { title: 'Revisar BGP e IGMP', content: '' }
            ]},
            { day: 'Sexta', duration: '2 horas', macroTopic: 'Redes de Computadores', type: 'study', status: 'pending', microTopics: [
                { title: 'DNS, VoIP (SIP, H.323)', content: '' }, { title: 'Modelo TCP/IP e dispositivos', content: '' }
            ]},
          ]
        },
        {
          title: 'Finalizando conteúdo com Desenvolvimento',
          days: [
            { day: 'Segunda', duration: '2 horas', macroTopic: 'Linguagens de Programação', type: 'study', status: 'pending', microTopics: [
                { title: 'Laços for vs. while', content: '' }, { title: 'Python (variáveis), C# (estruturas)', content: '' }
            ]},
            { day: 'Terça', duration: '1 hora', macroTopic: 'Revisão Ativa', type: 'review', status: 'pending', microTopics: [
                { title: 'Praticar pequenos códigos', content: '' }
            ]},
            { day: 'Quarta', duration: '2 horas', macroTopic: 'Desenvolvimento Web', type: 'study', status: 'pending', microTopics: [
                { title: 'Front-end: React e Bootstrap', content: '' }
            ]},
            { day: 'Quinta', duration: '1 hora', macroTopic: 'Revisão Ativa', type: 'review', status: 'pending', microTopics: [
                { title: 'Revisar conceitos de React e Bootstrap', content: '' }
            ]},
            { day: 'Sexta', duration: '2 horas', macroTopic: 'Repescagem', type: 'catch-up', status: 'pending', microTopics: [
                { title: 'Escolha o tema de maior dificuldade', content: '' }, { title: 'Reforço final antes da revisão', content: '' }
            ]},
          ]
        },
        {
          title: 'Revisão Geral do Ciclo 2 e Final',
          days: [
            { day: 'Segunda', duration: '2 horas', macroTopic: 'Revisão Geral', type: 'general-review', status: 'pending', microTopics: [
                { title: 'Banco de Dados', content: '' }, { title: 'Simulado de 15 questões', content: '' }
            ]},
            { day: 'Terça', duration: '1 hora', macroTopic: 'Revisão Rápida', type: 'general-review', status: 'pending', microTopics: [
                { title: 'Revisar pontos de dificuldade', content: '' }
            ]},
            { day: 'Quarta', duration: '2 horas', macroTopic: 'Revisão Geral', type: 'general-review', status: 'pending', microTopics: [
                { title: 'Análise de Dados/IA e Redes', content: '' }, { title: 'Simulado de 15 questões', content: '' }
            ]},
            { day: 'Quinta', duration: '1 hora', macroTopic: 'Revisão Rápida', type: 'general-review', status: 'pending', microTopics: [
                { title: 'Revisar pontos de dificuldade', content: '' }
            ]},
            { day: 'Sexta', duration: '2 horas', macroTopic: 'Revisão Geral Final', type: 'general-review', status: 'pending', microTopics: [
                { title: 'Desenvolvimento Web/Linguagens', content: '' }, { title: 'Simulado geral com 20 questões', content: '' }
            ]},
          ]
        },
      ]
    }
  ];

  async ngOnInit() {
    await this.loadStudyPlan();
  }

  async loadStudyPlan() {
    this.loading = true;
    this.cdr.detectChanges();
    try {
      const studyPlanRef = doc(this.firestore, 'study-plans', this.DOCUMENT_ID);
      const docSnap = await getDoc(studyPlanRef);
      if (docSnap.exists()) {
        const data = docSnap.data() as StudyPlanDocument;
        this.studyPlan = data.studyPlan;
        this.showMessage('Cronograma carregado com sucesso!');
      } else {
        await this.saveStudyPlan(this.defaultStudyPlan);
        this.studyPlan = this.defaultStudyPlan;
        this.showMessage('Cronograma inicial criado no Firebase!');
      }
    } catch (error) {
      console.error('Erro ao carregar cronograma:', error);
      this.studyPlan = this.defaultStudyPlan;
      this.showMessage('Erro ao carregar dados. Usando cronograma padrão.', 'error');
    } finally {
      this.loading = false;
      this.cdr.detectChanges();
    }
  }

  async toggleStatus(day: StudyDay): Promise<void> {
    const previousStatus = day.status;
    day.status = day.status === 'pending' ? 'completed' : 'pending';
    this.cdr.detectChanges();
    try {
      await this.saveStudyPlan(this.studyPlan);
      const statusText = day.status === 'completed' ? 'concluída' : 'pendente';
      this.showMessage(`Tarefa marcada como ${statusText}!`);
    } catch (error) {
      day.status = previousStatus;
      this.cdr.detectChanges();
      console.error('Erro ao salvar status:', error);
      this.showMessage('Erro ao salvar alteração!', 'error');
    }
  }

  // NOVA FUNÇÃO para salvar o conteúdo quando o usuário sai do campo de texto
  async onContentChange(): Promise<void> {
    try {
      await this.saveStudyPlan(this.studyPlan);
      this.showMessage('Anotação salva!', 'success');
    } catch (error) {
        console.error('Erro ao salvar anotação:', error);
        this.showMessage('Erro ao salvar anotação!', 'error');
    }
  }

  private async saveStudyPlan(studyPlan: StudyCycle[]): Promise<void> {
    const studyPlanData: StudyPlanDocument = {
      id: this.DOCUMENT_ID,
      studyPlan: studyPlan,
      lastUpdated: new Date()
    };
    const studyPlanRef = doc(this.firestore, 'study-plans', this.DOCUMENT_ID);
    await setDoc(studyPlanRef, studyPlanData, { merge: true }); // Usar merge para evitar sobrescrever dados por acidente
  }

  private showMessage(message: string, type: 'success' | 'error' = 'success'): void {
    this.snackBar.open(message, 'Fechar', {
      duration: 2000,
      panelClass: type === 'error' ? 'error-snackbar' : 'success-snackbar'
    });
  }

  async resetStudyPlan(): Promise<void> {
    this.loading = true;
    this.cdr.detectChanges();
    try {
      await this.saveStudyPlan(this.defaultStudyPlan);
      this.studyPlan = JSON.parse(JSON.stringify(this.defaultStudyPlan)); // Cria uma cópia profunda
      this.showMessage('Cronograma resetado com sucesso!');
    } catch (error) {
      console.error('Erro ao resetar cronograma:', error);
      this.showMessage('Erro ao resetar cronograma!', 'error');
    } finally {
      this.loading = false;
      this.cdr.detectChanges();
    }
  }
}
