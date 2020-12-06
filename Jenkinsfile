pipeline {
    agent any

    tools {
        nodejs "node"
        maven "mvn"
        jdk "openjdk-11"
    }

    stages {

        stage('Cloning Git') {
            steps {
                git 'https://github.com/sabtwski/twwo-jenkins'
            }
        }
            
        stage('Install dependencies') {
            steps {
                sh '(cd backend; mvn clean install -DskipTests)'
                sh '(cd frontend; npm install)'
            }
        }
            
        stage('Test') {
            steps {
                sh '(cd backend; mvn test)'
                sh '(cd frontend; npm test)'
            }
        }      
    }
}