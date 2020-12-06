pipeline {
    agent any

    tools {
        nodejs "node"
        maven "mvn"
        jdk "openjdk-11"
    }

    stages {

        stage('Cloning Git repository') {
            steps {
                git 'https://github.com/sabtwski/twwo-jenkins'
            }
        }
            
        stage('Build backend') {
            steps {
                sh '(cd backend; mvn clean install -DskipTests)'
            }
        }

        stage('Build frontend') {
            steps {
                sh '(cd frontend; npm install)'
            }
        }

        stage('Test backend') {
            steps {
                sh '(cd backend; mvn test)'
            }
        }
            
        stage('Test frontend') {
            steps {
                sh '(cd frontend; npm test)'
            }
        }      
    }
}