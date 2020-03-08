FROM ubuntu:18.04
COPY . /ResourcesAllocation_
RUN make /ResourcesAllocation_
CMD python /app/app.py