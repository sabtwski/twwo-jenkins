pipeline {
    agent any

    tools {
        nodejs "node"
        maven "mvn"
    }

    stages {
        
    stage('Cloning Git') {
        steps {
            git 'git@github.com:dwawrzyniak1/piisw-projekt.git'
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