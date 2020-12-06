pipeline {
    agent any

    tools {
        nodejs "node"
        maven "mvn"
    }

    stages {

        stage('Cloning Git repository') {
            steps {
                git 'https://github.com/sabtwski/twwo-jenkins'
            }
        }
            
        stage('Build backend') {
            steps {
                sh 'cd backend'
                sh 'mvn clean install -DskipTests'
            }
        }

        stage('Build frontend') {
            steps {
                sh 'cd frontend'
                sh 'npm install'
            }
        }

        stage('Test backend') {
            steps {
                sh 'cd backend'
                sh 'mvn test'
            }
        }
            
        stage('Test frontend') {
            steps {
                sh 'cd frontend'
                sh 'npm test'
            }
        }      
    }
}