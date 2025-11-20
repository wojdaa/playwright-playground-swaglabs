pipeline {
  agent {
    docker {
      image 'mcr.microsoft.com/playwright:v1.48.0-jammy'
    }
  }

  stages {
    stage('Install') {
      steps {
        sh 'npm ci'
      }
    }

    stage('Test') {
      steps {
        sh 'npx playwright test'
      }
    }
  }

  post {
    always {
      junit 'test-results/playwright-junit.xml'
      archiveArtifacts artifacts: 'playwright-report/**', fingerprint: true
    }
  }
}
