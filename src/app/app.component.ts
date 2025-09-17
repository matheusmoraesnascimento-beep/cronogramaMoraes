import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';

interface StudyDay {
  day: string;
  duration: string;
  macroTopic: string;
  microTopics: string[];
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

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatExpansionModule,
    MatCardModule,
    MatCheckboxModule,
    MatListModule,
    MatIconModule,
    MatDividerModule
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
studyPlan: StudyCycle[] = [
    {
      title: 'Ciclo 1: Governança, Segurança e Engenharia de Software',
      weeks: [
        {
          title: 'Foco em Governança de TI',
          days: [
            { day: 'Segunda', duration: '2 horas', macroTopic: 'Governança de TI', microTopics: ['COBIT: Governança de riscos', 'Alinhamento com ITIL', 'Atualizações (COBIT 5 para 2019)'], type: 'study', status: 'pending' },
            { day: 'Terça', duration: '1 hora', macroTopic: 'Revisão Ativa', microTopics: ['Revisar anotações de COBIT', 'Fazer 5-10 questões sobre o tema'], type: 'review', status: 'pending' },
            { day: 'Quarta', duration: '2 horas', macroTopic: 'Governança de TI', microTopics: ['ITIL: Gestão de serviços', 'Relação com PMBOK', 'Integração com COBIT'], type: 'study', status: 'pending' },
            { day: 'Quinta', duration: '1 hora', macroTopic: 'Revisão Ativa', microTopics: ['Revisar anotações de ITIL', 'Fazer 5-10 questões sobre o tema'], type: 'review', status: 'pending' },
            { day: 'Sexta', duration: '2 horas', macroTopic: 'Gerenciamento de Projetos', microTopics: ['PMBOK: Conceitos de PMO', 'Comparação com COBIT/ITIL', 'Artefatos visuais (diagramas)'], type: 'study', status: 'pending' },
          ],
        },
        {
          title: 'Finalizando Governança e iniciando Segurança',
          days: [
            { day: 'Segunda', duration: '2 horas', macroTopic: 'Legislação Aplicada a TI', microTopics: ['Licitações: Lei nº 14.133/2021', 'Modalidades de concorrência', 'Inexigibilidade, Contratos e SLA'], type: 'study', status: 'pending' },
            { day: 'Terça', duration: '1 hora', macroTopic: 'Revisão Ativa', microTopics: ['Revisar anotações de Legislação', 'Focar nos principais artigos'], type: 'review', status: 'pending' },
            { day: 'Quarta', duration: '2 horas', macroTopic: 'Segurança da Informação', microTopics: ['Normas ISO/ABNT 27001 e 27002', 'Gestão de incidentes, Controles'], type: 'study', status: 'pending' },
            { day: 'Quinta', duration: '1 hora', macroTopic: 'Revisão Ativa', microTopics: ['Revisar anotações das normas ISO', 'Focar nos objetivos dos controles'], type: 'review', status: 'pending' },
            { day: 'Sexta', duration: '2 horas', macroTopic: 'Segurança da Informação', microTopics: ['ISO 27005 (Análise de Riscos)', 'Série X.509 (Certificados Digitais)'], type: 'study', status: 'pending' },
          ]
        },
        {
          title: 'Aprofundando em Segurança e iniciando Eng. de Software',
          days: [
            { day: 'Segunda', duration: '2 horas', macroTopic: 'Segurança de Redes', microTopics: ['Protocolos: VPN, SSL/TLS', 'IPSec (protocolos AH e ESP)'], type: 'study', status: 'pending' },
            { day: 'Terça', duration: '1 hora', macroTopic: 'Revisão Ativa', microTopics: ['Revisar anotações de protocolos', 'Entender camadas de atuação'], type: 'review', status: 'pending' },
            { day: 'Quarta', duration: '2 horas', macroTopic: 'Segurança de Redes', microTopics: ['Redes sem Fio: EAP, WEP, WPA/WPA2', 'Sistemas de Detecção de Intrusão (IDS/IPS)'], type: 'study', status: 'pending' },
            { day: 'Quinta', duration: '1 hora', macroTopic: 'Revisão Ativa', microTopics: ['Revisar segurança wireless e IDS/IPS'], type: 'review', status: 'pending' },
            { day: 'Sexta', duration: '2 horas', macroTopic: 'Engenharia de Software', microTopics: ['Scrum: Ciclo, Sprints, Papéis', 'Kanban: Fluxo, Quadros, Pull'], type: 'study', status: 'pending' },
          ]
        },
        {
          title: 'Foco em Engenharia e Qualidade de Software',
          days: [
            { day: 'Segunda', duration: '2 horas', macroTopic: 'Engenharia de Software', microTopics: ['Comparação: XP, Scrum, FDD, Lean', 'Conceitos ágeis gerais'], type: 'study', status: 'pending' },
            { day: 'Terça', duration: '1 hora', macroTopic: 'Revisão Ativa', microTopics: ['Revisar metodologias ágeis'], type: 'review', status: 'pending' },
            { day: 'Quarta', duration: '2 horas', macroTopic: 'Ciclo de Vida do Software', microTopics: ['Engenharia de Requisitos'], type: 'study', status: 'pending' },
            { day: 'Quinta', duration: '1 hora', macroTopic: 'Revisão Ativa', microTopics: ['Revisar anotações de Requisitos'], type: 'review', status: 'pending' },
            { day: 'Sexta', duration: '2 horas', macroTopic: 'Qualidade de Software', microTopics: ['Qualidade e Testes, CMMI, APF'], type: 'study', status: 'pending' },
          ]
        },
        {
          title: 'Revisão Geral do Ciclo 1',
          days: [
            { day: 'Segunda', duration: '2 horas', macroTopic: 'Revisão Geral', microTopics: ['Governança e Gerenciamento de TI', 'Simulado de 15 questões'], type: 'general-review', status: 'pending' },
            { day: 'Terça', duration: '1 hora', macroTopic: 'Revisão Rápida', microTopics: ['Revisar pontos de dificuldade'], type: 'general-review', status: 'pending' },
            { day: 'Quarta', duration: '2 horas', macroTopic: 'Revisão Geral', microTopics: ['Segurança da Informação', 'Simulado de 15 questões'], type: 'general-review', status: 'pending' },
            { day: 'Quinta', duration: '1 hora', macroTopic: 'Revisão Rápida', microTopics: ['Revisar pontos de dificuldade'], type: 'general-review', status: 'pending' },
            { day: 'Sexta', duration: '2 horas', macroTopic: 'Revisão Geral', microTopics: ['Engenharia de Software', 'Simulado de 15 questões'], type: 'general-review', status: 'pending' },
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
            { day: 'Segunda', duration: '2 horas', macroTopic: 'Banco de Dados Relacional', microTopics: ['SQL: DCL (GRANT, REVOKE)', 'Otimização (EXPLAIN)'], type: 'study', status: 'pending' },
            { day: 'Terça', duration: '1 hora', macroTopic: 'Revisão Ativa', microTopics: ['Praticar comandos DCL'], type: 'review', status: 'pending' },
            { day: 'Quarta', duration: '2 horas', macroTopic: 'Banco de Dados Relacional', microTopics: ['Modelagem, 4ª Forma Normal'], type: 'study', status: 'pending' },
            { day: 'Quinta', duration: '1 hora', macroTopic: 'Revisão Ativa', microTopics: ['Revisar formas normais'], type: 'review', status: 'pending' },
            { day: 'Sexta', duration: '2 horas', macroTopic: 'Banco de Dados NoSQL', microTopics: ['Tipos, Teorema CAP'], type: 'study', status: 'pending' },
          ]
        },
        {
          title: 'Finalizando BD e iniciando Análise de Dados/IA',
          days: [
            { day: 'Segunda', duration: '2 horas', macroTopic: 'Conceitos Gerais de BD', microTopics: ['Big Data e Transações: HDFS', 'Protocolo de bloqueio de duas fases', 'Índices'], type: 'study', status: 'pending' },
            { day: 'Terça', duration: '1 hora', macroTopic: 'Revisão Ativa', microTopics: ['Revisar HDFS, bloqueio e índices'], type: 'review', status: 'pending' },
            { day: 'Quarta', duration: '2 horas', macroTopic: 'Análise de Dados e IA', microTopics: ['Machine Learning: Naive Bayes', 'Modelos supervisionados vs. não'], type: 'study', status: 'pending' },
            { day: 'Quinta', duration: '1 hora', macroTopic: 'Revisão Ativa', microTopics: ['Revisar conceitos de ML'], type: 'review', status: 'pending' },
            { day: 'Sexta', duration: '2 horas', macroTopic: 'Análise de Dados e IA', microTopics: ['Python (Pandas, Keras), Métricas', 'Pré-processamento, Entropia'], type: 'study', status: 'pending' },
          ]
        },
        {
          title: 'Finalizando IA e focando em Redes',
          days: [
            { day: 'Segunda', duration: '2 horas', macroTopic: 'Análise de Dados e IA', microTopics: ['IA Generativa (ChatGPT)', 'Processo de ETL, PLN, Dados Abertos'], type: 'study', status: 'pending' },
            { day: 'Terça', duration: '1 hora', macroTopic: 'Revisão Ativa', microTopics: ['Revisar IA Generativa e ETL'], type: 'review', status: 'pending' },
            { day: 'Quarta', duration: '2 horas', macroTopic: 'Redes de Computadores', microTopics: ['Protocolos de Roteamento: BGP, AS', 'Protocolo IGMP'], type: 'study', status: 'pending' },
            { day: 'Quinta', duration: '1 hora', macroTopic: 'Revisão Ativa', microTopics: ['Revisar BGP e IGMP'], type: 'review', status: 'pending' },
            { day: 'Sexta', duration: '2 horas', macroTopic: 'Redes de Computadores', microTopics: ['DNS, VoIP (SIP, H.323)', 'Modelo TCP/IP e dispositivos'], type: 'study', status: 'pending' },
          ]
        },
        {
          title: 'Finalizando conteúdo com Desenvolvimento',
          days: [
            { day: 'Segunda', duration: '2 horas', macroTopic: 'Linguagens de Programação', microTopics: ['Laços for vs. while', 'Python (variáveis), C# (estruturas)'], type: 'study', status: 'pending' },
            { day: 'Terça', duration: '1 hora', macroTopic: 'Revisão Ativa', microTopics: ['Praticar pequenos códigos'], type: 'review', status: 'pending' },
            { day: 'Quarta', duration: '2 horas', macroTopic: 'Desenvolvimento Web', microTopics: ['Front-end: React e Bootstrap'], type: 'study', status: 'pending' },
            { day: 'Quinta', duration: '1 hora', macroTopic: 'Revisão Ativa', microTopics: ['Revisar conceitos de React e Bootstrap'], type: 'review', status: 'pending' },
            { day: 'Sexta', duration: '2 horas', macroTopic: 'Repescagem', microTopics: ['Escolha o tema de maior dificuldade', 'Reforço final antes da revisão'], type: 'catch-up', status: 'pending' },
          ]
        },
        {
          title: 'Revisão Geral do Ciclo 2 e Final',
          days: [
            { day: 'Segunda', duration: '2 horas', macroTopic: 'Revisão Geral', microTopics: ['Banco de Dados', 'Simulado de 15 questões'], type: 'general-review', status: 'pending' },
            { day: 'Terça', duration: '1 hora', macroTopic: 'Revisão Rápida', microTopics: ['Revisar pontos de dificuldade'], type: 'general-review', status: 'pending' },
            { day: 'Quarta', duration: '2 horas', macroTopic: 'Revisão Geral', microTopics: ['Análise de Dados/IA e Redes', 'Simulado de 15 questões'], type: 'general-review', status: 'pending' },
            { day: 'Quinta', duration: '1 hora', macroTopic: 'Revisão Rápida', microTopics: ['Revisar pontos de dificuldade'], type: 'general-review', status: 'pending' },
            { day: 'Sexta', duration: '2 horas', macroTopic: 'Revisão Geral Final', microTopics: ['Desenvolvimento Web/Linguagens', 'Simulado geral com 20 questões'], type: 'general-review', status: 'pending' },
          ]
        },
      ]
    }
  ];
  toggleStatus(day: StudyDay): void {
    day.status = day.status === 'pending' ? 'completed' : 'pending';
  }
}
