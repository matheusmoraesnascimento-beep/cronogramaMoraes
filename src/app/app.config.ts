import { ApplicationConfig } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http'; // <-- 1. IMPORTE AQUI

// Imports do Firebase
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

// Sua configuração que o Firebase te deu
const firebaseConfig = {
  apiKey: "AIzaSyCXcdkavbh5k4i8Oz2umcEJJPqd7-KdjE8",
  authDomain: "cronogramaestudosmoraes.firebaseapp.com",
  projectId: "cronogramaestudosmoraes",
  storageBucket: "cronogramaestudosmoraes.appspot.com",
  messagingSenderId: "5159463240",
  appId: "1:5159463240:web:93f2d20cbcb1138a32ab7d"
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideFirestore(() => getFirestore()),
    provideHttpClient()
  ]
};
