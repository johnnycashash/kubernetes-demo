::::::::::Start:::::::::

- Go to dockerfiles folder and execute docker build -t jagansingh/kube-cli . and docker push jagansingh/kube-cli:latest
- Execute docker run -d --name jenkins-lts -p 8080:8080 -p 50000:50000 -v jenkins-data:/var/jenkins_home --network minikube jenkins/jenkins:lts
- Install suggested plugins and Create a user
- Go to manage jenkins then plugins then available plugins and install kubernetes and kubernetes-cli plugin
- tick restart and restart container manually
- Go to manage jenkins then manage nodes then built-in-nodes then configure and set no of executors as 0 and save
- Go to manage jenkins then manage nodes then configure cloud then click kubernetes cloud details then add credentials(secret file type) and choose file(see #1 for file) and give id(kubeconfig_copied) then add Jenkins url as http://192.168.49.3:8080 and jenkins tunnel as 192.168.49.3:50000 and save
- Check Test connection is successful
- Go to Manage Jenkins then Credentials then System then Global credentials (unrestricted) and add Credentials of type username with password and add your dockerhub username and password and put id as dockerhub-pwd
- Create pipeline job and paste pipeline script below:


    podTemplate(label: 'mypod', containers: [
        containerTemplate(name: 'git', image: 'alpine/git', ttyEnabled: true, command: 'cat'),
        containerTemplate(name: 'maven', image: 'maven:3.3.9-jdk-8-alpine', command: 'cat', ttyEnabled: true),
        containerTemplate(name: 'kubectl', image: 'jagansingh/kube-cli:latest', command: 'cat', ttyEnabled: true),
        containerTemplate(name: 'docker', image: 'docker', command: 'cat', ttyEnabled: true)
    ], volumes: [
        hostPathVolume(mountPath: '/var/run/docker.sock', hostPath: '/var/run/docker.sock'),
    ]) 
    
    {
        node('mypod') {

            stage('Check running containers') {
                container('docker') {
                    sh 'hostname'
                    sh 'hostname -i'
                    sh 'docker ps'
                }
            }
    
            stage('Clone repository') {
                container('git') {
                    sh 'whoami'
                    sh 'hostname -i'
                    sh 'git clone -b master https://github.com/lvthillo/hello-world-war.git'
                }
            }
    
            stage('Maven Build') {
                container('maven') {
                    dir('hello-world-war/') {
                        sh 'hostname'
                        sh 'hostname -i'
                        sh 'mvn clean install'
                    }
                }
            }
    
            stage('Kubectl Deploy') {
                container('kubectl') {
                    withKubeConfig(caCertificate: '', clusterName: '', contextName: '', credentialsId: 'kubeconfig_copied', namespace: '', restrictKubeConfigAccess: false, serverUrl: '') {
                        sh 'kubectl get pods'
                    }
                }
            }
    
        }
    }


OR


    podTemplate(label: 'mypod', containers: [
        containerTemplate(name: 'git', image: 'alpine/git', ttyEnabled: true, command: 'cat'),
        containerTemplate(name: 'maven', image: 'maven:3.8.6-openjdk-11', command: 'cat', ttyEnabled: true),
        containerTemplate(name: 'kubectl', image: 'jagansingh/kube-cli:latest', command: 'cat', ttyEnabled: true),
        containerTemplate(name: 'docker', image: 'docker', command: 'cat', ttyEnabled: true)
    ], volumes: [
        hostPathVolume(mountPath: '/var/run/docker.sock', hostPath: '/var/run/docker.sock'),
    ])

    {
        node('mypod') {
    
            stage('Clone repository') {
                container('git') {
                    sh 'whoami'
                    sh 'hostname -i'
                    sh 'git clone -b main https://github.com/johnnycashash/kubernetes-demo.git'
                }
            }
    
            stage('Maven Build') {
                container('maven') {
                    sh 'hostname'
                    sh 'hostname -i'
                    sh 'cd ./kubernetes-demo/product-api && mvn -Dmaven.test.failure.ignore=true clean package'
                }
            }
    
            stage('Docker Build') {
                container('docker') {
                    sh 'hostname'
                    sh 'hostname -i'
                    sh 'cd ./kubernetes-demo/product-api && docker build -t jagansingh/product-api .'
                }
            }
    
            stage('Docker Login') {
                container('docker') {
                    withCredentials([usernamePassword(credentialsId: 'dockerhub-pwd', usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD')]) {
                        sh 'hostname'
                        sh 'hostname -i'
                        sh 'echo $PASSWORD | docker login -u $USERNAME --password-stdin'
                    }
                }
            }
    
            stage('Docker Push') {
                container('docker') {
                    sh 'hostname'
                    sh 'hostname -i'
                    sh 'docker push jagansingh/product-api:latest'
                }
            }
    
            stage('Kubectl Deploy') {
                container('kubectl') {
                    withKubeConfig(caCertificate: '', clusterName: '', contextName: '', credentialsId: 'kubeconfig_copied', namespace: '', restrictKubeConfigAccess: false, serverUrl: '') {
                        sh 'cd ./kubernetes-demo/k8s/2 && kubectl apply -f product-deployment.yaml'
                    }
                }
            }
        }
    }

#1:
- Copy file \\wsl.localhost\Ubuntu-20.04\home\jagansingh\.kube\config to some location
- Change server as : server: https://192.168.49.2:8443
- Execute "cat /home/jagansingh/.minikube/ca.crt  | base64 -w 0" and replace certificate-authority: /home/jagansingh/.minikube/ca.crt with certificate-authority-data: copied data
- Execute "cat /home/jagansingh/.minikube/profiles/minikube/client.crt  | base64 -w 0" and replace client-certificate: /home/jagansingh/.minikube/profiles/minikube/client.crt with client-certificate-data: copied data
- Execute "cat /home/jagansingh/.minikube/profiles/minikube/client.key  | base64 -w 0" and replace client-key: /home/jagansingh/.minikube/profiles/minikube/client.key with client-key-data: copied data
- Save the file