pipeline {
    agent any

    tools {
        nodejs "node"
        maven "mvn"
        java "openjdk-11"
    }

    stages {

        stage('Cloning Git') {
            steps {
                git 'https://github.com/sabtwski/twwo-jenkins'
            }
        }
            
        stage('Install dependencies') {
            steps {
                sh 'env.JAVA_HOME="${tool 'openjdk-11'}"'
                sh 'env.PATH="${env.JAVA_HOME}/bin:${env.PATH}"'
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