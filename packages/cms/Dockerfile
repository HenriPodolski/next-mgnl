FROM tomcat:9.0.43-jdk11-openjdk-slim

ENV JAVA_OPTS="-Dmagnolia.home=/opt/magnolia -Dmagnolia.resources.dir=/opt/magnolia -Dmagnolia.update.auto=true -Dmagnolia.author.key.location=/opt/magnolia/activation-key/magnolia-activation-keypair.properties"

# Copy Tomcat setenv.sh
COPY ./tomcat-setenv.sh $CATALINA_HOME/bin/setenv.sh
RUN chmod +x $CATALINA_HOME/bin/setenv.sh

# This directory is used for Magnolia property "magnolia.home"
RUN mkdir /opt/magnolia
RUN chmod 755 /opt/magnolia

ARG ARTIFACT_VERSION

RUN rm -rf $CATALINA_HOME/webapps/ROOT
COPY next-mgnl-lightmodules/target/next-mgnl-lightmodules.jar $CATALINA_HOME/next-mgnl-lightmodules/target/next-mgnl-lightmodules.jar
COPY webapp/target/ROOT.war $CATALINA_HOME/webapps/