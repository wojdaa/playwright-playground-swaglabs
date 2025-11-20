pipeline {
  agent any

  environment {
    BASE_URL = 'https://www.saucedemo.com'
  }

  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }

    stage('Install dependencies') {
      steps {
        sh 'npm ci'
        sh 'npx playwright install'
      }
    }

    stage('Run Playwright tests') {
      steps {
        sh 'npx playwright test'
      }
    }
  }

  post {
    always {
      // to zadziała jak dodasz JUnit reporter w playwright.config.ts
      catchError(buildResult: 'SUCCESS', stageResult: 'FAILURE') {
        junit 'test-results/playwright-junit.xml'
      }

      archiveArtifacts artifacts: 'playwright-report/**', fingerprint: true
    }
  }
}
